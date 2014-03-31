Activity::Application.routes.draw do
  #get "home/index"
  #root :to => "home#index"
  #root "home#index"
  root "login#login"
  #get "login" => "login#login"
  get "regist" => "login#regist"
  get "welcome1" => "login#welcome1"
  post "/regist" => "login#create"
  post "/process_login" => "login#process_login"

  get "admin" => "admin#manager_index"
  get "add_user" => "admin#add_user"
  post "add_user" => "admin#create"
  delete "del_user"=> "admin#del_user"

  get "forgot1" => "login#forgot1"
  get "forgot2" => "login#forgot2"
  post "forgot1" => "login#forgot_pw1"
  get "forgot3" => "login#forgot3"

  get "quit" =>"login#quit"
  get "home_page" =>"login#home_page"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
