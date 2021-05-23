import { createContext, useState, useCallback, useEffect } from "react"
import { auth, db, FirebaseTimestamp } from "../firebase"
import { isValidEmailFormat, isValidRequiredInput } from "../utils/validation"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [uid, setUid] = useState("")

  const signin = useCallback(async (email, password) => {
    // email,paswordはfirebase側でバリデーションしてくれるが一旦実装
    if (!isValidRequiredInput(email, password)) {
      alert("input error")
      return false
    }
    if (!isValidEmailFormat(email)) {
      alert("email error")
      return false
    }

    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => setUid(userCredential.user.uid))
      .catch((error) => {
        alert(error.message)
      })
  }, [])

  const signup = useCallback(async (email, password, nickname) => {
    // email,paswordはfirebase側でバリデーションしてくれるが一旦実装
    if (!isValidRequiredInput(email, password, nickname)) {
      alert("input error")
      return false
    }
    if (!isValidEmailFormat(email)) {
      alert("email error")
      return false
    }

    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user
        if (user) {
          const timestamp = FirebaseTimestamp.now()
          const initialUserData = {
            created_at: timestamp,
            email: email,
            nickname: nickname,
            uid: user.uid,
            updated_at: timestamp,
          }

          db.collection("users").doc(user.uid).set(initialUserData)
          setUid(user.uid)
        }
      })
      .catch((error) => {
        alert(error.message)
      })
  }, [])

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid)
      }
    })
    return () => unSub()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signin,
        signup,
        uid,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
