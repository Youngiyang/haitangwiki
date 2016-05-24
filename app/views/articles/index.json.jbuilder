json.array!(@articles) do |article|
  json.extract! article, :id, :title, :content, :img, :categroy_id
  json.url article_url(article, format: :json)
end
