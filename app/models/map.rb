class Map < ApplicationRecord
  enum status: [ :in_progress, :available, :failed ]
end
