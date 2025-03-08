# 📃 zitat

이 프로젝트는 사용자가 인용구를 검색하고 탐색할 수 있는 웹 애플리케이션입니다. 사용자는 랜덤 인용구를 보고, 인용구의 저자 정보를 확인할 수 있습니다.

- 홈
- 기록
- 검색

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [SQLite](https://www.sqlite.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)

## Schema

```sql
CREATE TABLE "zitat" (
	"uuid"	TEXT,
	"date"	TEXT,
	"quote"	TEXT,
	"author"	TEXT,
	"keywords"	TEXT,
	PRIMARY KEY("uuid")
)
```
