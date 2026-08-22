import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage'
import { MyAccountPage } from '../pages/MyAccountPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';

//Load JSON test data logindata.json
const jsonpath = "testdata/logindata.json";
const jsonTestData = DataProvider.getTestDataFromJson(jsonpath);

for (const data of jsonTestData) {
    test(`Login Test with JSON Data:${data.testName} @datadriven`, async ({ page }) => {
        const config = new TestConfig(); //Load config (URL,credentials)
        await page.goto(config.appUrl); //Navigate to baseURL

        //Initialize pageObjects
        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage=new LoginPage(page);
        await loginPage.login(data.email,data.password);

        if(data.expected.toLowerCase()==='success'){
            const myAccountPage=new MyAccountPage(page);
            const isLoggedIn=myAccountPage.isMyAccountExists();
            expect(isLoggedIn).toBeTruthy();
        }else{
            const errorMessage=await loginPage.getLoginErrorMessage();
            expect(errorMessage).toBe(' Warning: No match for E-Mail Address and/or Password.')
        }
    })
}

//Load JSON test data logindata.json
const csvpath = "testdata/logindata.csv";
const csvTestData = DataProvider.getTestDatafromCSV(csvpath);

for (const data of csvTestData) {
    test(`Login Test with CSV Data:${data.testName} @datadriven`, async ({ page }) => {
        const config = new TestConfig(); //Load config (URL,credentials)
        await page.goto(config.appUrl); //Navigate to baseURL

        //Initialize pageObjects
        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginPage=new LoginPage(page);
        await loginPage.login(data.email,data.password);

        if(data.expected.toLowerCase()==='success'){
            const myAccountPage=new MyAccountPage(page);
            const isLoggedIn=myAccountPage.isMyAccountExists();
            expect(isLoggedIn).toBeTruthy();
        }else{
            const errorMessage=await loginPage.getLoginErrorMessage();
            expect(errorMessage).toBe(' Warning: No match for E-Mail Address and/or Password.')
        }
    })
}
