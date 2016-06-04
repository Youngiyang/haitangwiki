class Article < ActiveRecord::Base
  belongs_to :categroy
  belongs_to :user
end
