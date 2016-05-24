json.array!(@categroys) do |categroy|
  json.extract! categroy, :id, :name
  json.url categroy_url(categroy, format: :json)
end
