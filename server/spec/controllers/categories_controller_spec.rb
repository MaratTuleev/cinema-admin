require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do
  describe 'POST #save_all' do
    let!(:film1) { create(:film) }
    let!(:film2) { create(:film) }
    let!(:existing_category) { create(:category, name: 'Old Name') }
    let!(:sub_category) { create(:sub_category, category: existing_category, name: 'Old Sub') }

    it 'handles full save_all payload correctly' do
      payload = {
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
                id: sub_category.id,
                is_deleted: true,
                name: 'Old Sub'
              }
            ],
            updated_sub_categories: []
          }
        ],
        deleted_categories: []
      }

      post :save_all, params: payload, as: :json

      expect(response).to have_http_status(:success)
      expect(Category.find(existing_category.id).name).to eq('Updated Name')
      expect(SubCategory.find_by(id: sub_category.id)).to be_nil

      new_category = Category.find_by(name: 'New Category')
      expect(new_category).not_to be_nil
      expect(new_category.sub_categories.first.films).to include(film1)

      new_sc = SubCategory.find_by(name: 'New SC for Existing')
      expect(new_sc.films).to include(film2)
    end
  end
end