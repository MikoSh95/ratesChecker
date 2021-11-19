import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const screenshotsDir = path.join(path.resolve(), 'screenshots');

async function getScreenshot(url, fileName, site) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
    const browser = await puppeteer.launch({
        args: [`--window-size=1080,1920`],
        defaultViewport: {
            width: 1080,
            height: 1920
        }
    });
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: 'networkidle0'
    });
    switch (site) {
        case 'justjoinit':
            const element = await page.$x(`//div[div/div/button[@aria-controls='menu-list-grow']]`);
            await element[0].screenshot({ path: fileName, captureBeyondViewport: true });
        case 'nofluffjobs':
            const acceptCookiesBtnNofluff = await page.$(`button[data-cy='btnAcceptCookie']`);
            if(acceptCookiesBtnNofluff) await acceptCookiesBtnNofluff.click();
            await page.screenshot({path: fileName, fullPage: true, captureBeyondViewport: true});
        case 'bulldogjobs':
            const acceptCookiesBtnBulldog = await page.$(`a#acceptCookies`);
            if(acceptCookiesBtnBulldog) {
                await acceptCookiesBtnBulldog.click();
            }

            await page.waitForSelector('a#acceptCookies', {hidden: true});

            await page.screenshot({path: fileName, fullPage: true, captureBeyondViewport: true});
    }

    await browser.close();
};

getScreenshot('https://justjoin.it/offers/manpowergroup-senior-qa-engineer-python', path.join(screenshotsDir, `jji${Date.now()}.png`), 'justjoinit');
getScreenshot('https://nofluffjobs.com/pl/job/senior-qa-engineer-devire-remote-82b6mk2m', path.join(screenshotsDir, `nfj${Date.now()}.png`), 'nofluffjobs');
getScreenshot('https://bulldogjob.pl/companies/jobs/76957-devops-team-lead-lodz-harman-connected-services-poland', path.join(screenshotsDir, `bdj${Date.now()}.png`), 'bulldogjobs');