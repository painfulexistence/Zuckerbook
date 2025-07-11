class Ability
  include CanCan::Ability

  def initialize(user)
    cannot :index, Post

		if user.present?
      if user.banned?
        #puts banned_checked
        can [:index, :show, :like], Post, user_id: user.id
        can [:index, :show, :like], Post
        can [:index, :show], Comment
        can [:log], PublicActivity::Activity, owner_id: user.id
        can [:show, :follow, :unfollow, :block], User
        can [:create, :destroy], Friendship, user_id: user.id
      elsif user.has_role?(:newbie, user)
        #puts "user_checked"
        can [:index, :show, :new, :create, :edit, :update, :destroy, :like], Post, user_id: user.id
        can [:index, :show, :like], Post
        can [:index, :show, :create, :update, :destroy], Comment
        can [:log], PublicActivity::Activity
        can [:show, :follow, :unfollow, :block], User
        can [:create, :destroy], Friendship, user_id: user.id
				can [:create], Message, user_id: user.id
      elsif user.has_role?(:admin, user)
        #puts "admin_checked"
        can [:index, :show, :new, :create, :edit, :update, :destroy, :like], Post
        can [:index, :show, :create, :update, :destroy], Comment
        can [:log, :index, :show], PublicActivity::Activity
        can [:show, :follow, :unfollow, :block], User
        can [:create, :destroy], Friendship
				can [:create], Message, user_id: user.id
      elif user.has_role?(:Zucker, user)
        #puts "Zucker_checked"
        can [:index, :show, :new, :create, :edit, :update, :destroy, :like], Post
        can [:index, :show, :create, :update, :destroy], Comment
        can [:log, :index, :show], PublicActivity::Activity
        can [:index, :show, :follow, :unfollow, :block, :warn, :ban], User
        can [:index, :create, :destroy], Friendship
				can [:create], Message, user_id: user.id
      end
		end
  end
end
