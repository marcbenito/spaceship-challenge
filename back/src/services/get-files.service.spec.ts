import path from 'path';
import { getSpaceshipFile, getHunterFile } from './get-files.service';

describe('getFilesService', () => {
    describe('test getSpaceshipFile', () => {
        describe('when valid file provided', () => {
            it('should return a valid file', async () => {
                const result = await getSpaceshipFile(path.join('./', 'test/spaceship-trip-ok.json'));
                expect(result).toBeDefined();
            });
        });
        describe('when invalid filePath provided', () => {
            it('should return an error', async () => {
                try {
                    await getSpaceshipFile('invented-file-path.xxxxx');
                } catch (e) {
                    expect(e.message).toBe("ENOENT: no such file or directory, open 'invented-file-path.xxxxx'");
                }
            });
        });
        describe('when valid path but invlaid parameters', () => {
            it('should return an error', async () => {
                try {
                    await getSpaceshipFile(path.join('./', 'test/spaceship-trip-miss.json'));
                } catch (e) {
                    expect(e.message).toContain('An instance of SpaceshipValidator');
                }
            });
        });
    });
    describe('test getHunterFile', () => {
        describe('when valid file provided', () => {
            it('should return a valid file', async () => {
                const result = await getHunterFile(path.join('./', 'test/hunter-ok.json'));
                expect(result).toBeDefined();
            });
        });
        describe('when invalid filePath provided', () => {
            it('should return an error', async () => {
                try {
                    await getHunterFile('invented-file-path.xxxxx');
                } catch (e) {
                    expect(e.message).toBe("ENOENT: no such file or directory, open 'invented-file-path.xxxxx'");
                }
            });
        });
        describe('when valid path but invlaid parameters', () => {
            it('should return an error', async () => {
                try {
                    await getHunterFile(path.join('./', 'test/hunter-miss.json'));
                } catch (e) {
                    expect(e.message).toContain('An instance of HunterValidator');
                }
            });
        });
    });
});
