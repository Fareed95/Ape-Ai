# 🧠 Psychology ChatBot API Documentation

## Base URL

    https://bot-ape.crodlin.in/api/

------------------------------------------------------------------------

## 1️⃣ Chat with Psychology Bot

**Endpoint:**

    POST /api/psychology_chat_bot/

**Description:**\
Start or continue a psychology chat session. The bot remembers past
conversations and maintains a summary per session.

**Request Body (JSON):**

``` json
{
  "email": "user@example.com",
  "user_input": "I want to learn data processing",
  "session_id": "12345"
}
```

**Response (JSON):**

``` json
{
  "bot_response": "Learning data processing can be a valuable skill. Here are some options to consider..."
}
```

------------------------------------------------------------------------

## 2️⃣ Delete a Conversation

**Endpoint:**

    POST /api/delete_conversation/

**Description:**\
Deletes all chats and summary for a specific session. Useful for
resetting the conversation.

**Request Body (JSON):**

``` json
{
  "email": "user@example.com",
  "session_id": "12345"
}
```

**Response (JSON):**

``` json
{
  "message": "Conversation deleted successfully."
}
```

------------------------------------------------------------------------

## 3️⃣ Generate a Prompt for LLM

**Endpoint:**

    POST /api/make_prompt/

**Description:**\
Creates a contextual prompt for LLM using the stored summary. If no
summary exists, a fresh conversation is started.

**Request Body (JSON):**

``` json
{
  "email": "user@example.com",
  "session_id": "12345"
}
```

**Response (JSON):**

``` json
{
  "prompt": "I want to learn django..."
}
```

------------------------------------------------------------------------

## Notes for Frontend

-   Always pass **email** and **session_id** → session_id ensures each
    session is unique per user.\
-   `psychology_chat_bot/` → for chatting with bot.\
-   `delete_conversation/` → to reset session.\
-   `make_prompt/` → to get context-aware prompt for bot.