# == Schema Information
#
# Table name: pins
#
#  id         :bigint(8)        not null, primary key
#  author_id  :integer          not null
#  title      :string
#  link_url   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  board_id   :integer
#

class Pin < ApplicationRecord
    validates :author_id, presence: true
    has_many :pins_boards
    has_many :boards, :through => :pins_boards
    has_one_attached :photo
end
