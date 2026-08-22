import {Page, expect,Locator } from '@playwright/test';

export class HomePage{
    private readonly page:Page;
    //Locators
    private readonly lnkMyAccount:Locator;
    private readonly lnkRegister:Locator;
    private readonly linkLogin:Locator;
    private readonly txtSearchbox:Locator;
    private readonly btnSearch:Locator;

    //constructor
    constructor(page:Page){
        this.page=page;
        this.lnkMyAccount=page.locator('span:has-text("My Account")');
        this.lnkRegister=page.locator('a:has-text("Register")');
        this.linkLogin=page.locator('a:has-text("Login")');
        this.txtSearchbox=page.locator("//input[@placeholder='Search']");
        this.btnSearch=page.locator('#search button[type="button]');
    }

    //actionMethods
    //check if HomePage exists

    async isHomePageExists(){
        let title:string=await this.page.title();
        if(title){
            return true;
        }
        return false;
    }

    //click "My Account" link
    async clickMyAccount(){
        try{
            await this.lnkMyAccount.click();
        }catch(error){
            console.log(`Exception occured while clicking 'My Account':${error}`);
            throw error;
        }
    }

    async clickRegister(){
        try{
            await this.lnkRegister.click();
        }catch(error){
            console.log(`Exception occured while clicking 'MRegister':${error}`);
            throw error;
        }
    }

    //clcik "My Account" link
    async clickLogin(){
        try{
            await this.linkLogin.click();
        }catch(error){
            console.log(`Exception occured while clicking 'My Account':${error}`);
            throw error;
        }
    }

    //click "My Account" link
    async enterProductName(pName:string){
        try{
            await this.txtSearchbox.fill(pName);
        }catch(error){
            console.log(`Exception occured while clicking 'My Account':${error}`);
            throw error;
        }
    }

    //click search button
    async clickSearch(){
        try{
            await this.btnSearch.click();
        }catch(error){
            console.log(`Exception occured while clicking 'My Account':${error}`);
            throw error;
        }
    }
}