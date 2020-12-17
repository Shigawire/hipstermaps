class Map < ApplicationRecord
  enum status: [ :in_progress, :available, :failed ]

  validates :title, presence: true
  validates :format, presence: true
  validates :lon, presence: true
  validates :lat, presence: true
  validates :zoom, presence: true
  validates :style, presence: true
  validates :subtitle, presence: true
  validates :coords, presence: true

  before_commit :set_filename, only: :create
  after_commit :start_worker, only: :create

  def set_filename
    update(filename: "#{SecureRandom.urlsafe_base64}.png") unless filename
  end

  def cdn_url
    "https://#{ENV['MAPS_CDN_HOST']}/#{filename}"
  end

  def preview_url
    "https://#{ENV['MAPS_CDN_HOST']}/preview_#{filename}"
  end

  def start_worker
    MapWorker.perform_async(id) if in_progress?
  end
end
