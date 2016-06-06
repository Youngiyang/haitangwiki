namespace :init do
  desc "add super admin"
  task :super_admin => [:environment] do
    User.create!(
      name: "超级管理员",
      mobile: "13751749724",
      password: "JS@_#2016",
      verify_code: "123456",
      is_admin: true)
  end
end

