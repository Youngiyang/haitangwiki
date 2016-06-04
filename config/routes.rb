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
  get 'good/:id' => 'articles#good', as: 'good'
  get 'cancle/:id' => 'articles#canclegood', as: 'cancle'
  get 'classical' => 'welcome#classical'
  get 'find' => 'users#find'
  post 'find_password' => 'users#find_password'
  get 'about' => 'welcome#about'
  mount RuCaptcha::Engine => "/rucaptcha"

end
