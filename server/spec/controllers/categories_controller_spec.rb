require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do
  describe 'POST #save_all' do
    let!(:film1) { create(:film) }
    let!(:film2) { create(:film) }
    let!(:film3) { create(:film) }
    let!(:existing_category) { create(:category, name: 'Old Name') }
    let!(:existing_sub_category) { create(:sub_category, category: existing_category, name: 'Old Sub') }
    let!(:sub_category_to_update) { create(:sub_category, category: existing_category, name: 'Sub to Update') }
    let!(:category_to_delete) { create(:category, name: 'To Be Deleted') }

    let(:payload) do
      {
        new_categories: [
          {
            name: 'New Category',
            sub_categories: [
              {
                name: 'New SubCategory',
                film_ids: [film1.id]
              }
            ]
          }
        ],
        updated_categories: [
          {
            id: existing_category.id,
            name: 'Updated Name',
            new_sub_categories: [
              {
                name: 'New SC for Existing',
                film_ids: [film2.id],
                is_new: true,
                is_edited: true
              }
            ],
            deleted_sub_categories: [
              {
                id: existing_sub_category.id,
                is_deleted: true,
                name: 'Old Sub'
              }
            ],
            updated_sub_categories: [
              {
                id: sub_category_to_update.id,
                name: 'Updated SubCategory',
                film_ids: [film3.id],
                is_edited: true
              }
            ]
          }
        ],
        deleted_categories: [
          {
            id: category_to_delete.id
          }
        ]
      }
    end

    before { post :save_all, params: payload, as: :json }

    it 'creates new categories and subcategories with films' do
      new_category = Category.find_by(name: 'New Category')
      expect(new_category).not_to be_nil
      expect(new_category.sub_categories.first.films).to include(film1)
    end

    it 'updates existing category and subcategories' do
      expect(Category.find(existing_category.id).name).to eq('Updated Name')

      new_sc = SubCategory.find_by(name: 'New SC for Existing')
      expect(new_sc.films).to include(film2)

      updated_sc = SubCategory.find_by(id: sub_category_to_update.id)
      expect(updated_sc.name).to eq('Updated SubCategory')
      expect(updated_sc.films).to include(film3)
    end

    it 'deletes subcategories and categories' do
      expect(SubCategory.find_by(id: existing_sub_category.id)).to be_nil
      expect(Category.find_by(id: category_to_delete.id)).to be_nil
    end
  end
end