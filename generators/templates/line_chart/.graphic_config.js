let bucket = null;

var exports = module.exports = {};

const S3_BUCKETS = {
    production: 'apps.npr.org',
    staging: 'stage-apps.npr.org'
}

const buildConfig = function(target) {
    return {
        DEPLOYMENT_TARGET: target,
        S3_BUCKET: bucket, 
        SLUG: '<%= slug %>',
        PYM: {
            pym_url: '//pym.nprapps.org/pym.v1.min.js',
            pym_loader_url: '//pym.nprapps.org/pym-loader.v1.min.js'
        },
        CAREBOT_ENABLED: true,
        CAREBOT_URL: '//carebot.nprapps.org/carebot-tracker.v0.min.js',
        GOOGLE_ANALYTICS: {
            ACCOUNT_ID: 'UA-5828686-75'
        },
        GOOGLE_DOC_ID: '<%= id %>'
    }
}

exports.configureTargets = function(target) {
    deploymentTarget = target;
    bucket = S3_BUCKETS[target];

    return buildConfig(target);
}