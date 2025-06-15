import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

const resetDatabase = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    return fetch(`${apiUrl}/utils/reset-database`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const performDatabaseReset = async () => {
    try {
        const response = await resetDatabase();
        if (!response.ok) {
            return null;
        }

        const json = await response.json();
        return json;
    } catch (error) {
        console.error('Error resetting database:', error);
    }
};

async function setupNodeEvents(
    on: Cypress.PluginEvents,
    config: Cypress.PluginConfigOptions,
): Promise<Cypress.PluginConfigOptions> {
    await addCucumberPreprocessorPlugin(on, config);

    on('task', {
        async 'reset-database'() {
            return await performDatabaseReset();
        },
    });

    on(
        'file:preprocessor',
        createBundler({
            plugins: [createEsbuildPlugin(config)],
        }),
    );

    return config;
}

export default defineConfig({
    e2e: {
        specPattern: 'cypress/e2e/features/**/*.feature',
        baseUrl: process.env.NEXT_BASE_API_URL || 'http://localhost:8080',
        setupNodeEvents,
        reporter: 'mochawesome',
        reporterOptions: {
            reportDir: 'cypress/reports',
            overwrite: true,
            html: true,
            json: true,
        },
        screenshotsFolder: 'cypress/screenshots',
        videosFolder: 'cypress/videos',
    },
});
