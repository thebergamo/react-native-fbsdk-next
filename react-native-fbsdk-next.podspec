require 'json'
package = JSON.parse(File.read(File.join(__dir__, './', 'package.json')))

FBSDKVersion = "16.3.1"

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package['version']
  s.summary       = package['description']
  s.requires_arc  = true
  s.author        = { 'thebergamo' => 'marcos@thedon.com.br' }
  s.license       = package['license']
  s.homepage      = package['homepage']
  s.source        = { :git => 'https://github.com/thebergamo/react-native-fbsdk-next.git', :tag => "v#{package['version']}" }
  s.platforms     = { :ios => "12.0", :tvos => "12.0" }
  s.dependency      'React-Core'

  s.subspec 'Core' do |ss|
    ss.dependency     'FBSDKCoreKit', "~> #{FBSDKVersion}"
    ss.source_files = 'ios/RCTFBSDK/core/*.{h,m}'
  end

  s.subspec 'Login' do |ss|
    ss.dependency     'FBSDKLoginKit', "~> #{FBSDKVersion}"
    ss.source_files = 'ios/RCTFBSDK/login/*.{h,m}'
  end

  s.subspec 'Share' do |ss|
    ss.dependency     'FBSDKShareKit', "~> #{FBSDKVersion}"
    ss.dependency     'FBSDKGamingServicesKit', "~> #{FBSDKVersion}"
    ss.source_files = 'ios/RCTFBSDK/share/*.{h,m}'
  end
end
