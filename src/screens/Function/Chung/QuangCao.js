import { AppOpenAd, InterstitialAd, RewardedAd, 
  RewardedAdEventType, BannerAd, TestIds, BannerAdSize, AdEventType} from 'react-native-google-mobile-ads';
  
  // 2023-06-06: gắn ID đơn vị quảng cáo, ID của ứng dụng gắn ở app.json (ID android với iOS khác nhau)
  export const adUnitId_Banner = 'ca-app-pub-3940256099942544/6300978111';
  export const adUnitId_OpenApp = 'ca-app-pub-7635447421775373/8027351918'; // ID đơn vị quảng cáo khi mở app
  export const adUnitId_Reware = 'ca-app-pub-7635447421775373/7811729492'; // ID đơn vị quảng cáo có thưởng (download app khác từ ads sẽ tự gắn vào quảng cáo)
  
  // 06/06/2023: Test: const adUnitId_Banner_Test = 'ca-app-pub-3940256099942544/6300978111'
  // 06/06/2023: Chính: const adUnitId_Banner = 'ca-app-pub-7635447421775373/5373214512';
  
  export const appOpenAd = AppOpenAd.createForAdRequest(adUnitId_OpenApp, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['qlda', 'quan-ly-du-an', 'thủ tục đầu tư'],
  });
  
  export const rewarded = RewardedAd.createForAdRequest(adUnitId_Reware, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['qlda', 'quan-ly-du-an', 'thủ tục đầu tư'],
  })