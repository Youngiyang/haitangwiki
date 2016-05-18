require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  test "should get signout" do
    get :signout
    assert_response :success
  end

  test "should get login" do
    get :login
    assert_response :success
  end

end
