import { Page, Locator, expect } from '@playwright/test';

export class RegistrationPage {
    private readonly page: Page;

    // locators using CSS selectors
    private readonly txtFirstname: Locator;
    private readonly txtLastname: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephoe: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkdPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly msgConfirmation: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtFirstname = page.locator('#input-firstname');
        this.txtLastname = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtTelephoe = page.locator('#input-telephone');
        this.txtPassword = page.locator('#input-password');
        this.txtConfirmPassword = page.locator('#input-confirm');
        this.chkdPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('input[value="Continue"]');
        this.msgConfirmation = page.locator('h1:has-text("Your Account Has Been Created!")');
    }

    async setFirstName(fname: string): Promise<void> {
        await this.txtFirstname.fill(fname);
    }

    async setLastName(lname: string): Promise<void> {
        await this.txtLastname.fill(lname);
    }

    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    async setTelephone(phone: string): Promise<void> {
        await this.txtTelephoe.fill(phone);
    }

    async setPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    async setConfirmPassword(password: string): Promise<void> {
        await this.txtConfirmPassword.fill(password);
    }

    async checkPrivacyPolicy(): Promise<void> {
        await this.chkdPolicy.check();
    }

    async clickContinue(): Promise<void> {
        await this.btnContinue.click();
    }

    async registerUser(data: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
    }): Promise<void> {
        await this.setFirstName(data.firstName);
        await this.setLastName(data.lastName);
        await this.setEmail(data.email);
        await this.setTelephone(data.phone);
        await this.setPassword(data.password);
        await this.setConfirmPassword(data.password);
        await this.checkPrivacyPolicy();
        await this.clickContinue();
    }

    async verifyAccountCreated(): Promise<void> {
        await expect(this.msgConfirmation).toBeVisible();
    }
}