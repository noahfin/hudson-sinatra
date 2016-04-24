require "sinatra/base"
require "httparty"
require "pry"
require 'json'
require 'fileutils'

require_relative "server"


run Hudson::Server