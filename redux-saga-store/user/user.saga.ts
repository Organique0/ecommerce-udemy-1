import { takeLatest, put, all, call } from "typed-redux-saga";
import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed, googleSignInStart, githubSignInStart, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed, EmailSignInStart, SignUpStart, SignUpSuccess } from "./user.action";
import { createUserDocumentFromAuth, getCurrentUser, signInWithGithubPopup, signInWithGooglePopup, signInWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser, additionalInfo } from "../../utils/firebase/firebase.utils";
import { User, signOut } from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: additionalInfo) {
    try {

        const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails);
        if (userSnapshot) {
            yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated() {
    try {

        const userAuth = yield* call(getCurrentUser);
        if (!userAuth) return;

        yield* call(getSnapshotFromUserAuth, userAuth);

    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* SignInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup);

        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* SignInWithGithub() {
    try {
        const { user } = yield* call(signInWithGithubPopup);

        yield* call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* SignInWithEmail({ payload: { email, password } }: EmailSignInStart) {
    try {
        const userCrendential = yield* call(
            signInWithEmailAndPassword,
            email,
            password
        );

        if (userCrendential) {
            const { user } = userCrendential;
            yield* call(getSnapshotFromUserAuth, user);
        }
    } catch (error) {
        yield* put(signInFailed(error as Error));
    }
}

export function* SignUp({ payload: { email, password, displayName } }: SignUpStart) {
    try {
        const userCrendential = yield* call(createAuthUserWithEmailAndPassword, email, password);
        if (userCrendential) {
            const { user } = userCrendential;
            yield* put(signUpSuccess(user, { displayName }));
        }
    } catch (error) {
        yield* put(signUpFailed(error as Error));
    }
}

export function* SignInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    try {
        yield* call(getSnapshotFromUserAuth, user, additionalDetails);
    } catch (error) {

    }
}

export function* SignOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch (error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* onGoogleSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, SignInWithGoogle)
}
export function* onGithubSignInStart() {
    yield* takeLatest(USER_ACTION_TYPES.GITHUB_SIGN_IN_START, SignInWithGithub)
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {

    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, SignInWithEmail);
}

export function* onSignUpStart() {

    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, SignUp);
}

export function* onSignUpSuccess() {

    yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, SignInAfterSignUp);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, SignOut);
}

export function* userSagas() {
    yield* all([call(onCheckUserSession), call(onGoogleSignInStart), call(onGithubSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)]);
}