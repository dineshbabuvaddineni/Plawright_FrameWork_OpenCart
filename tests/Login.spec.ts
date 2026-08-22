/* Test Case: Login With Valid Credentials

Steps: 
1)Navigate to the application URL
2)Navigate to Login page via Home Page
3)Enter valid credentials and log in
4)verify successful login by checking 'My Account' page presence
*/

import {test,expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';
import {MyAccountPage} from '../pages/MyAccountPage';
import {TestConfig} from '../test.config';

let config:TestConfig;
let homePage:HomePage;
let loginPage:LoginPage;
let myAccountPage:MyAccountPage;

//This hook runs before each test
test.beforeEach(async({page})=>{
    config=new TestConfig(); //Load config (URL,credentials)
    await page.goto(config.appUrl); //Navigate to baseURL

    //Initialize pageObjects
    homePage=new HomePage(page);
    loginPage=new LoginPage(page);
    myAccountPage=new MyAccountPage(page);
});

//optional cleanup after each test
test.afterEach(async({page})=>{
    await page.close(); //close the browser tab

});

test('User login test @master @sanity @regression',async()=>{
    //Navigate to Login page via HomePage
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    //Enter valid credentials and login
    await loginPage.setEmail(config.email);
    await loginPage.setPassword(config.password);
    await loginPage.clickLogin();

    //alternatively
    //await loginPage.login(config.email,config.password);

    //verify successful login by checking 'My Account' page presence
    const isLoggedIn=await myAccountPage. isMyAccountExists();
    expect(isLoggedIn).toBeTruthy();

})




