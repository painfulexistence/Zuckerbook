Rails.application.routes.draw do

  get 'messages/create'

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

  get "activities", to: "activities#log"
  get "admin/activities", to: "activities#index"
  get "admin/activities/:id", to: "activities#show"

  resources :notifications, only: [:index, :show, :create, :destroy] do
    member do
      get :log
    end
  end

  resources :posts do
    member do
      patch :like
    end
    resources :comments
  end

	resources :messages, only: %i[create]

  resources :friendships, only: [:index, :show, :create, :destroy] do
    member do
      get :log
    end
  end

  root "posts#front"

  mount ActionCable.server => "/cable"
end
