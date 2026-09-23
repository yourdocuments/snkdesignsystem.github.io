/**
 * =====================================================
 * SNK DESIGN AGENCY — Make a user an Admin
 * =====================================================
 *
 * What this does:
 *   Sets a custom claim { admin: true } on a Firebase
 *   Authentication user. admin-login.html checks this
 *   claim before letting someone into admin.html.
 *
 * You only need to run this ONCE per admin account.
 *
 * -----------------------------------------------------
 * HOW TO USE
 * -----------------------------------------------------
 * 1) Get a service account key:
 *    Firebase console → ⚙ Project settings → Service accounts
 *    → "Generate new private key" → a .json file downloads.
 *    Rename it to  serviceAccountKey.json  and put it in the
 *    SAME folder as this script.
 *
 *    IMPORTANT: never upload serviceAccountKey.json to GitHub
 *    or share it — it gives full admin access to your project.
 *
 * 2) Install Node.js if you don't have it (nodejs.org),
 *    then in this folder run:
 *
 *        npm install firebase-admin
 *
 * 3) Edit the ADMIN_EMAIL value below to the email you
 *    created in Firebase Authentication.
 *
 * 4) Run:
 *
 *        node make-admin.js
 *
 *    You should see "Success! ... is now an admin."
 *
 * 5) Sign out and sign back in on admin-login.html so the
 *    new permission takes effect (Firebase tokens refresh
 *    on a fresh sign-in).
 * =====================================================
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// ----- EDIT THIS -----
const ADMIN_EMAIL = 'admin@example.com';
// ----------------------

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function makeAdmin(email) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log('Success! ' + email + ' (uid: ' + user.uid + ') is now an admin.');
    console.log('Sign out and sign back in on admin-login.html for it to take effect.');
  } catch (err) {
    console.error('Could not set admin claim:', err.message);
    console.error('Check that the email exists under Authentication → Users in Firebase console.');
  }
  process.exit();
}

makeAdmin(ADMIN_EMAIL);
