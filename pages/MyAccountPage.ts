import {Page, Locator} from '@playwright/test';
import {LogoutPage} from './LogoutPage'; 

export class MyAccountPage{
    private readonly page:Page;
    //Locators using CSS selectors
    private readonly msgHeading:Locator;
    private readonly lnkLogout:Locator;

    constructor(page:Page){
        this.page=page; 
        //Initialize locators with CSS selectors
        this.msgHeading=page.locator('h2:has-text("My Account")');
        this.lnkLogout=page.locator('text("Logout")');
    }

    async isMyAccountExists(): Promise<boolean>{
        try{
            const isVisible= await this.msgHeading.isVisible();
            return isVisible;
        }catch(error){
            console.log('Error checking My Account page heading visibility:${error}');
            return false;
        }
    }

    async clickLogout(): Promise<LogoutPage> {
        try{
            await this.lnkLogout.click();
            return new LogoutPage(this.page);
        }catch(error){
            console.log('Unable to click logout link:${error}');
            throw error; //Re-throw the error to fail the test
        }

    }

    async getPageTitle():Promise<string>{
        return (this.page.title());
    }


}