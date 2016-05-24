Rails.application.routes.draw do

  resources :articles
  resources :categroys
  get 'welcome/index'
  get 'users/signout'
  get 'users/login'
  get 'admin' => 'admins#admin'
  get 'signup' => 'users#signup'
  get 'login' => 'users#login'
  get 'collection' => 'articles#collection'
  post 'create_login_session' => 'users#create_login_session'
  delete 'logout' => 'users#logout'
  root 'welcome#index'
  resources :users
  post "send_code" => 'verify_code#send_code'
  get 'freezer' => 'welcome#freezer'

end
