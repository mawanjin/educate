//
//  ViewController.m
//  educate
//
//  Created by 陈明德 on 15-4-11.
//  Copyright (c) 2015年 qiji. All rights reserved.
//
#import "MBProgressHUD.h"
#import "ViewController.h"
#import<CoreLocation/CLLocationManager.h>
#import "MMLocationManager.h"
#import "SVProgressHUD.h"
#import "CCLocationManager.h"
#define IS_IOS7 ([[[UIDevice currentDevice] systemVersion] floatValue] >= 7)
#define IS_IOS8 ([[[UIDevice currentDevice] systemVersion] floatValue] >= 8)
@interface ViewController ()<CLLocationManagerDelegate>{
    CLLocationManager *locationmanager;
    
}


@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
    if (IS_IOS8) {
        [UIApplication sharedApplication].idleTimerDisabled = TRUE;
        locationmanager = [[CLLocationManager alloc] init];
        [locationmanager requestAlwaysAuthorization];        //NSLocationAlwaysUsageDescription
        [locationmanager requestWhenInUseAuthorization];     //NSLocationWhenInUseDescription
        locationmanager.delegate = self;
    }
    
    
	// Do any additional setup after loading the view, typically from a nib.
   // self.webView = [[UIWebView alloc] initWithFrame:CGRectMake(0.0, 0.0, self.view.frame.size.width, self.view.frame.size.height)];
  /*
    self.webView.scalesPageToFit = NO;
    self.webView.opaque = NO;
    self.webView.backgroundColor = [UIColor whiteColor];
    [self.webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:@"http://www.aguo.com"]]];
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:self.view animated:YES];
    hud.mode = MBProgressHUDModeIndeterminate;
    hud.labelText = @"加载中...";
*/
    //html
    
    self.webView.scalesPageToFit = YES;
   //self.webView.opaque = NO;
    self.webView.backgroundColor = [UIColor greenColor];
    //[self.webView sizeThatFits:[self.view frame].size ];
    self.webView.frame=self.view.frame;
    NSLog(@"%@",NSStringFromCGRect(self.view.frame));
    NSURL *url=[[NSBundle mainBundle] URLForResource:@"index" withExtension:@"html"  subdirectory:@"emobile"];
    
    
   // NSString *filePath =[[NSBundle mainBundle] pathForResource:@"index" ofType:@"html" inDirectory:@"emobile"];
  //  NSString *tail = @"?a=1";
  //  NSURL* url = [NSURL fileURLWithPath:filePath];
  //  NSURL* url = [NSURL fileURLWithPath:@"file:///Users/shuakira/Library/Developer/CoreSimulator/Devices/C8460454-16A2-450F-A9D9-F966F6B14E41/data/Containers/Bundle/Application/5D2583D6-8774-40D2-B525-6F135C362B37/educate.app/emobile/index.html#/home"];
    
     //   NSURLRequest* request = [NSURLRequest requestWithURL:[url URLByAppendingPathComponent:@"#home"]] ;
     NSURLRequest* request = [NSURLRequest requestWithURL:url] ;
    
    
    //encoding:NSUTF8StringEncoding error:nil 这一段一定要加，不然中文字会乱码
    /*
    NSString*htmlstring=[[NSString alloc] initWithContentsOfFile:filePath  encoding:NSUTF8StringEncoding error:nil];
    
    [self.webView loadHTMLString:htmlstring baseURL:[NSURL fileURLWithPath:[ [NSBundle mainBundle] bundlePath]]];
    url	NSURL *	@"file:///Users/shuakira/Library/Developer/CoreSimulator/Devices/C8460454-16A2-450F-A9D9-F966F6B14E41/data/Containers/Bundle/Application/5D2583D6-8774-40D2-B525-6F135C362B37/educate.app/emobile/index.html%23home"	0x7a989890
    */
    
    [self.webView loadRequest:request];
    MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:self.view animated:YES];
   hud.mode = MBProgressHUDModeIndeterminate;
    hud.labelText = @"加载中...";

    
}

- (void)webViewDidFinishLoad:(UIWebView *)webView {
    
    
    if (webView.loading==NO){
        [MBProgressHUD hideHUDForView:self.view animated:YES];
    }
    
    
}

- (void)webView:(UIWebView *)webView didFailLoadWithError:(NSError *)error {
    if (webView.loading==NO){
         [MBProgressHUD hideHUDForView:self.view animated:YES];
    }
    
   
}

- (void)webViewDidStartLoad:(UIWebView *)webView {
    
}

-(void)getParam1:(NSString*)str1 withParam2:(NSString*)str2
{
    NSLog(@"收到html传过来的参数：str1=%@,str2=%@",str1,str2);
}


- (void)locationManager:(CLLocationManager *)manager didChangeAuthorizationStatus:(CLAuthorizationStatus)status {
    
    switch (status) {
            
        case kCLAuthorizationStatusDenied :
            
        {
            
            // 提示用户出错原因，可按住Option键点击 KCLErrorDenied的查看更多出错信息，可打印error.code值查找原因所在
            
            UIAlertView *tempA = [[UIAlertView alloc]initWithTitle:@"提醒" message:@"请在设置-隐私-定位服务中开启定位功能！" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
            
            [tempA show];
            
        }
            
            break;
            
        case kCLAuthorizationStatusNotDetermined :
            
            if ([manager respondsToSelector:@selector(requestAlwaysAuthorization)])
                
            {
                
                NSLog(@"调用");
                
                [manager requestAlwaysAuthorization];
                
            }
            
            break;
            
        case kCLAuthorizationStatusRestricted:
            
        {
            
            // 提示用户出错原因，可按住Option键点击 KCLErrorDenied的查看更多出错信息，可打印error.code值查找原因所在
            
            UIAlertView *tempA = [[UIAlertView alloc]initWithTitle:@"提醒" message:@"定位服务无法使用！" delegate:nil cancelButtonTitle:@"确定" otherButtonTitles:nil, nil];
            
            [tempA show];
            
            
            
        }
            
        default:
            
            
            
            break;
            
    }
    
}



- (void)doGPS
{
    
    NSLog(@"收到html传过来的");
    
    if (IS_IOS8) {
        
        [[CCLocationManager shareLocation]getLocationCoordinate:^(CLLocationCoordinate2D locationCorrrdinate) {
           
        } withAddress:^(NSString *addressString) {
            NSLog(@"%@",addressString);
            [SVProgressHUD showWithStatus:addressString];
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.8 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [SVProgressHUD dismiss];
            });
           
            
            [self.webView stringByEvaluatingJavaScriptFromString: [NSString stringWithFormat:@"updateCMD('%@')",addressString]];
            
            
            
            
        }];
    }else{
    
    /*利用第三方的一个类定位*/
    if ([CLLocationManager locationServicesEnabled]) {
            [[MMLocationManager shareLocation] getAddress:^(NSString *addressString) {
            NSLog(@"获取地址: %@", addressString);
            [SVProgressHUD showWithStatus:addressString];
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.8 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                [SVProgressHUD dismiss];
            });
                
                [self.webView stringByEvaluatingJavaScriptFromString: [NSString stringWithFormat:@"updateCMD('%@')",addressString]];
                
          
    }];
}else
    {
        
        NSLog(@"失败");
        [SVProgressHUD showWithStatus:@"定位失败!"];
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.8 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [SVProgressHUD dismiss];
        });
        
    }
    
    
    }
    
   
}

- (BOOL)webView:(UIWebView*)webView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
    //   NSURL *url = [request URL];
    //  NSString *curUrl= [url absoluteString];
    //NSLog(@"cururl...............%@",curUrl);

    
    NSString *urlString = [[request URL] absoluteString];
    urlString = [urlString stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSLog(@"urlString=%@",urlString);
    NSArray *urlComps = [urlString componentsSeparatedByString:@"://"];
    
    if([urlComps count] && [[urlComps objectAtIndex:0] isEqualToString:@"objc"])
    {
        
        NSArray *arrFucnameAndParameter = [(NSString*)[urlComps objectAtIndex:1] componentsSeparatedByString:@":/"];
        NSString *funcStr = [arrFucnameAndParameter objectAtIndex:0];
        
        if (1 == [arrFucnameAndParameter count])
        {
            // 没有参数
            if([funcStr isEqualToString:@"relocateGpsCMD"])
            {
                
                /*调用本地函数1*/
                [self doGPS];
                
            }
        }
        else
        {
            //有参数的
            if([funcStr isEqualToString:@"getParam1:withParam2:"])
            {
                [self getParam1:[arrFucnameAndParameter objectAtIndex:1] withParam2:[arrFucnameAndParameter objectAtIndex:2]];
            }
        }
        return NO;
    }
    return YES;
}


- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
