class VerifyCodeController < ApplicationController
  skip_before_filter :verify_authenticity_token, only: [:send_code]
  def send_code
    mobile = params[:mobile]
    verify_code = { code: generate_code, expire_at: Time.now + 2.minutes, auth_state: false }
    if VerifyCodeHelper.send_auth_code_sms mobile, verify_code[:code]
      session[:verify_code] = verify_code
      render js: "alert('手机验证码已发送，请注意查收')"
    else
      render js: "alert('手机发送验证码失败')"
    end
  end

  def activated?
    !session[:verify_code][:auth_state] && Time.now < session[:verify_code][:expire_at]
  end
  private
    def generate_code
      ((0...9).to_a.sample(3) + (0...9).to_a.sample(3)).join()
    end
end
