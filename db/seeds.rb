# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
    users = User.create([{ name: "Alice", email: "Alice@gmail.com", password: "imalice", password_confirmation: "imalice" }, \
                        { name: "Bob", email: "Bob@gmail.com", password: "imbobo", password_confirmation: "imbobo" }, \
                        { name: "Carol", email: "Carol@gmail.com", password: "imcarol", password_confirmation: "imcarol" }])
