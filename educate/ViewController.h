//
//  ViewController.h
//  educate
//
//  Created by 陈明德 on 15-4-11.
//  Copyright (c) 2015年 qiji. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ViewController : UIViewController
@property (retain, nonatomic) IBOutlet UIWebView *webView;
// 两个参数
-(void)getParam1:(NSString*)str1 withParam2:(NSString*)str2;
@end
