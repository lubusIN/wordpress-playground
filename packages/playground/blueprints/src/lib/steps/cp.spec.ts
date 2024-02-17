import { NodePHP } from '@php-wasm/node';
import { RecommendedPHPVersion } from '@wp-playground/wordpress';
import { cp } from './cp';

const docroot = '/php';
describe('Blueprint step cp()', () => {
	let php: NodePHP;
	beforeEach(async () => {
		php = await NodePHP.load(RecommendedPHPVersion);
		php.mkdir(docroot);
	});

	it('should copy a file', async () => {
		php.writeFile(`/${docroot}/index.php`, `<?php echo 'Hello World';`);
		await cp(php, {
			fromPath: `/${docroot}/index.php`,
			toPath: `/${docroot}/index2.php`,
		});

		expect(php.fileExists(`/${docroot}/index.php`)).toBe(true);
		expect(php.fileExists(`/${docroot}/index2.php`)).toBe(true);
	});

	it('should fail when the source file does not exist', async () => {
		await expect(
			cp(php, {
				fromPath: `/${docroot}/index.php`,
				toPath: `/${docroot}/index2.php`,
			})
		).rejects.toThrow(/There is no such file or directory/);
	});

	it('should fail when the source file is a directory', async () => {
		php.mkdir(`/${docroot}/dir`);
		await expect(
			cp(php, {
				fromPath: `/${docroot}/dir`,
				toPath: `/${docroot}/index2.php`,
			})
		).rejects.toThrow(/There is a directory under that path/);
	});

	it('should overwrite the target file', async () => {
		php.writeFile(`/${docroot}/index.php`, `<?php echo 'Hello World';`);
		php.writeFile(`/${docroot}/index2.php`, `<?php echo 'Goodbye World';`);
		await cp(php, {
			fromPath: `/${docroot}/index.php`,
			toPath: `/${docroot}/index2.php`,
		});

		expect(php.readFileAsText(`/${docroot}/index2.php`)).toBe(
			`<?php echo 'Hello World';`
		);
	});
});