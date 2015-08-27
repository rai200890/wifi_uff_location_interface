# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150617001519) do

  create_table "ap_models", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "ap_statuses", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "aps", force: :cascade do |t|
    t.string  "name",              limit: 255
    t.string  "wan_mac_address",   limit: 255
    t.string  "wlan_mac_address",  limit: 255
    t.string  "switch_ip",         limit: 255
    t.integer "port",              limit: 4
    t.string  "socket",            limit: 255
    t.string  "panel_port",        limit: 255
    t.string  "ip",                limit: 255
    t.text    "comments",          limit: 65535
    t.boolean "validated",         limit: 1
    t.string  "syslocation",       limit: 255
    t.float   "latitude",          limit: 24
    t.float   "longitude",         limit: 24
    t.float   "height",            limit: 24
    t.integer "location_id",       limit: 4
    t.integer "ap_model_id",       limit: 4
    t.integer "ap_status_id",      limit: 4
    t.integer "control_region_id", limit: 4
    t.float   "lat",               limit: 24
    t.float   "lng",               limit: 24
  end

  create_table "buildings", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.integer  "campus_id",  limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "campi", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "control_regions", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "floors", force: :cascade do |t|
    t.string   "number",      limit: 255
    t.integer  "building_id", limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "locations", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "floor_id",   limit: 4
  end

end
