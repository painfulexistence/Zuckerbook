Rails.application.routes.draw do

  devise_for :users, skip: "registrations"
  devise_scope :user do
    get "users/sign_up", to: "devise/registrations#new", as: "new_user_registration"
    post "users/sign_up", to: "devise/registrations#create", as: "user_registration"
    get "users/account", to: "devise/registrations#edit", as: "edit_user_registration"
    put "users/update", to: "devise/registrations#update", as: "update_user_registration"
    delete "users/clean", to: "devise/registrations#destroy", as: "clean_up"

  end

  get "admin", to: "users#index", as: "admin"
  get "users/:id", to: "users#show", as: "user_profile"
  patch "users/:id/subscribe", to: "users#follow"
  patch "users/:id/unsubscribe", to: "users#unfollow"
  patch "users/:id/ban", to: "users#ban"
  patch "users/:id/warn", to: "users#warn"

  get "users/:id/activities", to: "activities#show"
  get "admin/activities", to: "activities#index"

  resources :notifications

  resources :posts do
    member do
      patch 'like', to: "posts#like"
    end
    resources :comments
  end

  resources :friendships

  root "posts#index"
end
