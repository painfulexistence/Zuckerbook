time_start = Time.now
time_current = time_start

puts "Cleaning up..."

ActiveRecord::Base.transaction do
  # TODO: raise exception if any of the following fails
  ActiveStorage::Attachment.delete_all
  ActiveStorage::Blob.delete_all
  PublicActivity::Activity.delete_all
  ActsAsVotable::Vote.delete_all
  Comment.delete_all
  Follow.delete_all
  Friendship.delete_all
  User.joins(:roles).each { |user| user.roles.clear }
  Role.delete_all
  ActiveRecord::Base.connection.execute("DELETE FROM users_roles")
  Post.delete_all
  Message.delete_all
  Notification.delete_all
  JwtDenylist.delete_all
  User.delete_all
end

puts "Cleaning up done in #{Time.now - time_current} seconds"
time_current = Time.now

puts "Creating users..."

# Create admins
User.create!([
  {
    name: "Loïc",
    email: "ming.crepuscular@gmail.com",
    password: "000000",
    password_confirmation: "000000"
  },
  {
    name: "Zucker",
    email: "zucker@gmail.com",
    password: "zucker",
    password_confirmation: "zucker"
  }
])

batch_size = 2000

# Create users
password_digest = Devise::Encryptor.digest(User, "000000")
user_attributes = []
100000.times do |i|
  user_attributes << {
    name: Faker::Name.name,
    email: Faker::Internet.unique.email,
    birthday: Faker::Date.birthday(min_age: 18, max_age: 65),
    encrypted_password: password_digest,
    created_at: Time.current,
    updated_at: Time.current
  }
end
user_attributes.each_slice(batch_size) do |batch|
  User.insert_all(batch)
end
users = User.all
user_ids = users.pluck(:id)

puts "Create users in #{Time.now - time_current} seconds"
time_current = Time.now

puts "Creating posts..."

user_ids.each_slice(batch_size) do |user_id_batch|
	post_attributes = []
  user_id_batch.each do |user_id|
		3.times do
			post_attributes << {
				user_id: user_id,
				public: [true, false].sample,
				body: Faker::Lorem.paragraph(sentence_count: 5),
				created_at: Time.current,
				updated_at: Time.current
			}
		end
	end
	Post.insert_all(post_attributes)
end
posts = Post.all
post_ids = posts.pluck(:id)

puts "Create posts in #{Time.now - time_current} seconds"
time_current = Time.now

puts "Creating comments..."

comment_attributes = []
post_ids.each do |post_id|
  comment_count = rand(0..5)
  next if comment_count == 0

  commenters = user_ids.sample([comment_count, user_ids.length].min)
  commenters.each do |user_id|
    comment_attributes << {
      post_id: post_id,
      user_id: user_id,
      content: Faker::Lorem.paragraph(sentence_count: 1),
      created_at: Time.current,
      updated_at: Time.current
    }
  end
end
comment_attributes.each_slice(batch_size) do |batch|
  Comment.insert_all(batch)
end
comments = Comment.all

puts "Create comments in #{Time.now - time_current} seconds"
time_current = Time.now

# puts "Creating likes..."

# post_ids.each_slice(batch_size) do |post_id_batch|
# 	like_attributes = []
# 	post_id_batch.each do |post_id|
# 		like_count = rand(0..20)
# 		next if like_count == 0

# 		likers = user_ids.sample([like_count, user_ids.length].min)
# 		likers.each do |user_id|
# 			like_attributes << {
# 				votable_type: 'Post',
# 				votable_id: post_id,
# 				voter_type: 'User',
# 				voter_id: user_id,
# 				vote_flag: true,
# 				vote_scope: nil,
# 				created_at: Time.current,
# 				updated_at: Time.current
# 			}
# 		end
# 	end
# 	like_attributes.each_slice(batch_size) do |batch|
# 		ActsAsVotable::Vote.insert_all(batch)
# 	end
# end

# puts "Create likes in #{Time.now - time_current} seconds"
# time_current = Time.now

# puts "Creating follows..."

# follow_attributes = []
# user_ids.each do |user_id|
#   follow_count = rand(0..10)
#   next if follow_count == 0

#   potential_followable_ids = user_ids - [user_id]
#   followable_ids = potential_followable_ids.sample(follow_count)

#   followable_ids.each do |followable_id|
#     follow_attributes << {
#       followable_type: 'User',
#       followable_id: followable_id,
#       follower_type: 'User',
#       follower_id: user_id,
#       created_at: Time.current,
#       updated_at: Time.current
#     }
#   end
# end
# follow_attributes.each_slice(batch_size) do |batch|
#   Follow.insert_all(batch)
# end

# puts "Create follows in #{Time.now - time_current} seconds"
# time_current = Time.now

# puts "Creating friendships..."

# friendship_attributes = []
# user_ids.each do |user_id|
#   friendship_count = rand(0..5)
#   next if friendship_count == 0

#   potential_friend_ids = user_ids - [user_id]
#   friend_ids = potential_friend_ids.sample(friendship_count)

#   friend_ids.each do |friend_id|
#     friendship_attributes << {
#       user_id: user_id,
#       friend_id: friend_id,
#       confirmed: [true, false].sample,
#       created_at: Time.current,
#       updated_at: Time.current
#     }
#   end
# end
# friendship_attributes.each_slice(batch_size) do |batch|
#   Friendship.insert_all(batch)
# end

# puts "Create friendships in #{Time.now - time_current} seconds"
# time_current = Time.now

puts "Creating activities..."

activity_attributes = []
posts.find_each do |post|
  activity_attributes << {
    trackable_type: 'Post',
    trackable_id: post.id,
    owner_type: 'User',
    owner_id: post.user_id,
    key: 'post.create',
    recipient_type: 'Post',
    recipient_id: post.id,
    created_at: post.created_at,
    updated_at: post.updated_at
  }
end
comments.find_each do |comment|
  activity_attributes << {
    trackable_type: 'Comment',
    trackable_id: comment.id,
    owner_type: 'User',
    owner_id: comment.user_id,
    key: 'comment.create',
    recipient_type: 'Post',
    recipient_id: comment.post_id,
    created_at: comment.created_at,
    updated_at: comment.updated_at
  }
end
ActsAsVotable::Vote.find_each do |vote|
  activity_attributes << {
    trackable_type: 'Post',
    trackable_id: vote.votable_id,
    owner_type: 'User',
    owner_id: vote.voter_id,
    key: 'post.like',
    recipient_type: 'Post',
    recipient_id: vote.votable_id,
    created_at: vote.created_at,
    updated_at: vote.updated_at
  }
end
Follow.find_each do |follow|
  activity_attributes << {
    trackable_type: 'User',
    trackable_id: follow.followable_id,
    owner_type: 'User',
    owner_id: follow.follower_id,
    key: 'user.follow',
    recipient_type: 'User',
    recipient_id: follow.followable_id,
    created_at: follow.created_at,
    updated_at: follow.updated_at
  }
end
activity_attributes.each_slice(batch_size) do |batch|
  PublicActivity::Activity.insert_all(batch)
end

puts "Create activities in #{Time.now - time_current} seconds"
time_current = Time.now

puts "Creating done in #{Time.now - time_start} seconds"


puts "Users: #{User.count}"
puts "Posts: #{Post.count}"
puts "Comments: #{Comment.count}"
puts "Likes: #{ActsAsVotable::Vote.count}"
puts "Follows: #{Follow.count}"
puts "Friendships: #{Friendship.count}"
puts "Activities: #{PublicActivity::Activity.count}"