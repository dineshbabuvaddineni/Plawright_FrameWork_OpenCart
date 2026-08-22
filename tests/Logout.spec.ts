/*Test Case : User Logout
Tags @master @sanity @regression

steps:

1)Navigate to application URL
2)Go to login page from HomePage
3)Login with valid credentials
4) Verify 'My account' page
5) Click on logout link
6) Click on continue button
7) Verify user is redirected to Homepage

*/

import {test,expect} from '@playwright/test';
import {TestConfig} from '../test.config';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';
import {MyAccountPage} from '../pages/MyAccountPage';
import {LogoutPage} from '../pages/LogoutPage';

//Declare shared variables
let config:TestConfig;
let homePage:HomePage;
let loginPage:LoginPage;
let myAccountPage:MyAccountPage;
let logoutPage:LogoutPage;

//setup before each test
test.beforeEach(async({page})=>{
    config=new TestConfig(); //Load test config
    await page.goto(config.appUrl); //Step1: Navigate to app URL

    //Initalize page objects
    homePage=new HomePage(page);
    loginPage=new LoginPage(page);
    myAccountPage=new MyAccountPage(page);
    logoutPage=new LogoutPage(page);
});

//Optional cleanup after each test
test.afterEach(async({page})=>{
    await page.close(); //close the browser tab(helps keep tests clean)
});

test('User logout test @master @regression',async()=>{
    //step2: Navigate to Login Page
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //Step3: perform login using valid credentials
    await loginPage.login(config.email,config.password);

    //step4: Verify Successful Login
    expect(await myAccountPage.isMyAccountExists()).toBeTruthy();

    //step:5: click Logout, which returns LogoutPage instance
    logoutPage= await myAccountPage.clickLogout();

    //step 6: Verify "Continue" button is Visisble before clicking
    expect(await logoutPage.isContinueButtonVisible()).toBe(true);

    //step7: Click continue and verify redirection to HomePage
    homePage=await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);
})
