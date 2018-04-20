class Ability
  include CanCan::Ability
  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
    #   user ||= User.new # guest user (not logged in)
    #   if user.admin?
    #     can :manage, :all
    #   else
    #     can :read, :all
    #   end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    can :front, Post
    cannot :index, Post
    if user.present?
      if user.banned?
        #puts banned_checked
        can [:front, :index, :show, :like], Post, user_id: user.id
        can [:index, :show, :like], Post
        can [:index, :show], Comment
        can [:log], PublicActivity::Activity, owner_id: user.id
        can [:show, :follow, :unfollow, :block], User
        can [:create, :destroy], Friendship, user_id: user.id

      elsif user.has_role?(:newbie, user)
        #puts "user_checked"
        can [:front, :index, :show, :new, :create, :edit, :update, :destroy, :like], Post, user_id: user.id
        can [:index, :show, :like], Post
        can [:index, :show, :create], Comment
        can [:log], PublicActivity::Activity
        can [:show, :follow, :unfollow, :block], User
        can [:create, :destroy], Friendship, user_id: user.id

      elsif user.has_role?(:admin, user)
        #puts "admin_checked"
        can [:front, :index, :show, :new, :create, :edit, :update, :destroy, :like], Post
        can [:index, :show, :create], Comment
        can [:log, :index, :show], PublicActivity::Activity
        can [:show, :follow, :unfollow, :block], User
        can [:create, :destroy], Friendship
      else
        #new role can be implemented here
      end

      if user.has_role?(:Zucker, user)
        #puts "Zucker_checked"
        can [:front, :index, :show, :new, :create, :edit, :update, :destroy, :like], Post
        can [:read, :create], Comment
        can [:log, :index, :show], PublicActivity::Activity
        can [:index, :show, :follow, :unfollow, :block, :warn, :ban], User
        can [:index, :create, :destroy], Friendship
      end


    end
  end
end
