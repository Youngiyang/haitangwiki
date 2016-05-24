class Article < ActiveRecord::Base
  belongs_to :categroy
  belongs_to :user
  mount_uploader :img, AvatarUploader
end
