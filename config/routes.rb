Rails.application.routes.draw do
  devise_for :users, skip: "registrations", controllers: {
    sessions: 'sessions'
  }
  devise_scope :user do
    get "sign_up", to: "devise/registrations#new", as: "new_user_registration"
    post "sign_up", to: "devise/registrations#create", as: "user_registration"
    get "account", to: "devise/registrations#edit", as: "edit_user_registration"
    put "account_update", to: "devise/registrations#update", as: "update_user_registration"
    delete "account_delete", to: "devise/registrations#destroy", as: "clean_up"
  end

	if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
	end
  post "/graphql", to: "graphql#execute"

	get "admin", to: "users#index", as: "admin"
  get "users/:id/activities", to: "activities#show", as: "user_activities"
  get "activities", to: "activities#index"

  get "users/:id", to: "users#show", as: "user_profile"
  patch "users/:id/subscribe", to: "users#follow"
  patch "users/:id/unsubscribe", to: "users#unfollow"
  patch "users/:id/ban", to: "users#ban"
  patch "users/:id/warn", to: "users#warn"

  resources :posts do
    member do
      patch :like
    end
    resources :comments
  end

	resources :messages, only: %i[create]

  resources :friendships, only: [:index, :show, :create, :destroy]
	get :my_friendships, to: "friendships#log"

	get :my_activities, to: "activities#log"

  resources :notifications, only: [:index, :show, :create, :destroy]
	get :my_notifications, to: "notifications#log"

	namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show] do
        member do
          patch :follow
          patch :unfollow
          patch :ban
          patch :warn
        end
      end

      resources :posts, only: [:index, :show, :create, :update, :destroy] do
        member do
          patch :like
        end
        resources :comments, only: [:create, :update, :destroy]
      end

			resources :messages, only: [:create]

			resources :friendships, only: [:index, :show, :create, :destroy]
			get :my_friendships, to: "friendships#log"

			resources :activities, only: [:index]
			get "users/:id/activities", to: "activities#show"
			get :my_activities, to: "activities#log"

			resources :notifications, only: [:index, :show, :create, :destroy]
			get :my_notifications, to: "notifications#log"
    end
  end

  root "home#index"

  mount ActionCable.server => "/cable"
	mount Rswag::Ui::Engine => '/api-docs'
end
