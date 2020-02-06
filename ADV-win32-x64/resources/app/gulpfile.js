// JavaScript source code

var gulp = require('gulp');
var packager = require('electron-packager');
var config = require('./package.json');

// Windows�����A�v���̐ݒ�
gulp.task('packager-win', function (done) {
    packager({
        dir: './',                  // �A�v���{�̂̃t�H���_ 
        out: './release',           // �o�͐�̃t�H���_
        name: config.name,          // �A�v����
        arch: 'x64',                // 64bit
        platform: 'win32',          // Windows����
        electronVersion: '7.0.0',   // Electron�̃o�[�W����
        overwrite: true,            // ���łɃt�H���_������ꍇ�͏㏑��
        asar: true,
        appVersion: config.version, // �A�v���o�[�W����
        appCopyright: '',           // ���쌠
    });
});

// Mac�����A�v���̐ݒ�
gulp.task('packager-mac', function (done) {
    packager({
        dir: './',                  // �A�v���{�̂̃t�H���_ 
        out: './release',           // �o�͐�̃t�H���_
        name: config.name,          // �A�v����
        arch: 'x64',                // 64bit
        platform: 'darwin',         // Mac����
        electronVersion: '7.0.0',   // Electron�̃o�[�W����
        overwrite: true,            // ���łɃt�H���_������ꍇ�͏㏑��
        asar: true,
        appVersion: config.version, // �A�v���o�[�W����
        appCopyright: '',           // ���쌠
    });
});
