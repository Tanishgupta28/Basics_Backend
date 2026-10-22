# Planning sketches before coding

These are local equivalents of the narrated exercises, not replicas of the
instructor's unseen screen layout or Eraser's stock diagram.

## Registration and login (2:18:53–2:21:50)

```mermaid
flowchart LR
  subgraph Registration
    U[username]
    E[email]
    P[password]
    S[Register / Submit]
    U --> S
    E --> S
    P --> S
  end
  S --> D[(Stored user data)]
  Photo[Photo: possible extra field] -.-> S
  DOB[Date of birth: possible extra field] -.-> S
  subgraph Login
    LE[Existing email]
    LP[Existing password]
    V[Validate credentials]
    LE --> V
    LP --> V
  end
  D --> V
```

Photo and DOB illustrate changing requirements; neither becomes a final User
field. This sketch describes data inputs, not implemented authentication.

## Todo cards (2:21:58–2:27:38)

```mermaid
flowchart TD
  User[User] -->|creator| Main[Outer card: YouTube or gym]
  Main --> Title[Title / content]
  Main -.-> Color[Optional card color]
  Main --> List[List of sub-todos]
  List --> Child[Child task]
  Child --> Content[Content]
  Child --> Done[Marked as done]
  Child --> Date[Creation date]
  Child -.-> ChildColor[Color mentioned as an option]
```

The sketch discusses an array of objects. Later code selects references to
separate SubTodo documents. See [final models](models.md) for that final form.
