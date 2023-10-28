import { takeLatest, put, all, call } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess, signInFailed, googleSignInStart, githubSignInStart, signUpSuccess, signUpFailed, signOutSuccess, signOutFailed } from "./user.action";
import { createUserDocumentFromAuth, getCurrentUser, signInWithGithubPopup, signInWithGooglePopup, signInWithEmailAndPassword, createAuthUserWithEmailAndPassword, signOutUser } from "../../utils/firebase/firebase.utils";
import { User, signOut } from "firebase/auth";

export function* getSnapshotFromUserAuth(userAuth: any, additionalDetails: any) {
    try {
        //@ts-ignore
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
    } catch (error: any) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        //@ts-ignore
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        //@ts-ignore
        yield call(getSnapshotFromUserAuth, userAuth);

    } catch (error: any) {
        yield put(signInFailed(error));
    }
}

export function* SignInWithGoogle() {
    console.log('Signing in with Google');
    try {
        const { user } = yield call(signInWithGooglePopup);
        //@ts-ignore
        yield call(getSnapshotFromUserAuth, user);
    } catch (error: any) {
        yield put(signInFailed(error));
    }
}
export function* SignInWithGithub() {
    try {
        const { user } = yield call(signInWithGithubPopup);
        //@ts-ignore
        yield call(getSnapshotFromUserAuth, user);
    } catch (error: any) {
        yield put(signInFailed(error));
    }
}

export function* SignInWithEmail({ payload: { email, password } }: { payload: { email: String, password: String } }) {
    try {
        const { user } = yield call(
            signInWithEmailAndPassword,
            email,
            password
        );
        //@ts-ignore
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* SignUp({ payload: { email, password, displayName } }: { payload: { email: String, password: String, displayName: string } }) {
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* SignInAfterSignUp({ payload: { user, additionalDetails } }: { payload: { user: User, additionalDetails: any } }) {
    try {
        yield call(getSnapshotFromUserAuth, user, additionalDetails);
    } catch (error) {

    }
}

export function* SignOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error: any) {
        yield put(signOutFailed(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, SignInWithGoogle)
}
export function* onGithubSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GITHUB_SIGN_IN_START, SignInWithGithub)
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailSignInStart() {
    //@ts-ignore
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, SignInWithEmail);
}

export function* onSignUpStart() {
    //@ts-ignore
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, SignUp);
}

export function* onSignUpSuccess() {
    //@ts-ignore
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, SignInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, SignOut);
}

export function* userSagas() {
    yield all([call(onCheckUserSession), call(onGoogleSignInStart), call(onGithubSignInStart), call(onEmailSignInStart), call(onSignUpStart), call(onSignUpSuccess), call(onSignOutStart)]);
}