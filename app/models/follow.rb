class Follow < ActiveRecord::Base
	self.table_name = "follows"

  belongs_to :followable, polymorphic: true
  belongs_to :follower,   polymorphic: true

	# No repeated follows
	validates :follower_id, uniqueness: { scope: [:followable_id, :followable_type] }

  def block!
    self.update_attribute(:blocked, true)
  end

end
