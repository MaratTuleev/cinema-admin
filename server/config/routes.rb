Rails.application.routes.draw do
  get '/films', to: 'films#index'
  get '/categories', to: 'categories#index'
  post '/categories/save', to: 'categories#save_all'
end