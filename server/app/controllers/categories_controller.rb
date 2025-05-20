class CategoriesController < ApplicationController
  def index
    categories = Category.includes(sub_categories: :films)
    render json: categories.map { |c| serialize_category(c) }
  end

  def save_all
    data = category_params

    ActiveRecord::Base.transaction do
      process_deleted_categories(data[:deleted_categories])
      process_updated_categories(data[:updated_categories])
      process_new_categories(data[:new_categories])
    end

    render json: { success: true }
  end

  private

  def serialize_category(category)
    {
      id: category.id,
      name: category.name,
      sub_categories: category.sub_categories.map do |sc|
        {
          id: sc.id,
          name: sc.name,
          film_ids: sc.films.pluck(:id)
        }
      end
    }
  end

  def process_deleted_categories(deleted)
    Array(deleted).each do |cat|
      Category.find_by(id: cat[:id])&.destroy
    end
  end

  def process_updated_categories(updated)
    Array(updated).each do |cat_data|
      category = Category.find(cat_data[:id])
      category.update!(name: cat_data[:name])

      Array(cat_data[:new_sub_categories]).each do |sc|
        category.sub_categories.create!(
          name: sc[:name],
          film_ids: sc[:film_ids]
        )
      end

      Array(cat_data[:deleted_sub_categories]).each do |sc|
        SubCategory.find_by(id: sc[:id])&.destroy
      end

      Array(cat_data[:updated_sub_categories]).each do |sc|
        sub = SubCategory.find(sc[:id])
        sub.assign_attributes(name: sc[:name], film_ids: sc[:film_ids])
        sub.save!
      end
    end
  end

  def process_new_categories(new_cats)
    Array(new_cats).each do |cat_data|
      category = Category.create!(name: cat_data[:name])
      Array(cat_data[:sub_categories]).each do |sc|
        category.sub_categories.create!(
          name: sc[:name],
          film_ids: sc[:film_ids]
        )
      end
    end
  end

  def category_params
    params.permit(
      new_categories: [
        :name,
        { sub_categories: [:name, { film_ids: [] }] }
      ],
      updated_categories: [
        :id,
        :name,
        {
          new_sub_categories: [:name, :is_new, :is_edited, { film_ids: [] }],
          deleted_sub_categories: [:id, :is_deleted, :name, { film_ids: [] }],
          updated_sub_categories: [:id, :name, :is_edited, { film_ids: [] }]
        }
      ],
      deleted_categories: [:id]
    )
  end
end