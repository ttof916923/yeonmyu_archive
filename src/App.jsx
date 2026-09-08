import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "musical-attendance-manager-v1";

const CHARACTER_FIELDS = [
  { key: "character1", label: "김우진" },
  { key: "character2", label: "윤심덕" },
  { key: "character3", label: "사내" },
];

const PAYCO_SEAT_LAYOUT = {
  A: { left: [1,2,3,4], center: [5,6,7,8,9,10,11,12,13,14,15,16], right: [17,18,19,20,21,22] },
  B: { left: [1,2,3,4], center: [5,6,7,8,9,10,11,12,13,14,15,16], right: [17,18,19,20,21,22,23] },
  C: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  D: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  E: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  F: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  G: { left: [1,2,3,4,5], center: [6,7,8,9,10,11,12,13,14,15,16,17], right: [18,19,20,21,22,23,24,25] },
  H: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  I: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  J: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  K: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  L: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  M: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  N: { left: [1,2,3,4,5], center: [6,7,8,9,10,11,12,13,14,15,16,17], right: [18,19,20,21,22,23,24,25] },
  O: { left: [1,2,3,4,5], center: [6,7,8,9,10,11,12,13,14,15,16,17], right: [18,19,20,21,22,23,24,25] },
  P: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  Q: { left: [1,2,3,4,5,6], center: [7,8,9,10,11,12,13,14,15,16,17,18], right: [19,20,21,22,23,24,25,26] },
  R: { left: [1,2,3,4,5,6,7], center: [8,9,10,11,12,13,14,15,16,17,18,19], right: [20,21,22,23,24,25,26,27] },
  S: { left: [], center: [1,2,3,4,5,6,7,8], right: [9,10,11,12,13,14,15,16] },
};
const SEAT_ROWS = Object.keys(PAYCO_SEAT_LAYOUT);

const DEFAULT_INFO = {
  title: "작품명을 입력하세요",
  theater: "공연장을 입력하세요",
  startDate: "",
  endDate: "",
};

function createEmptyRow() {
  return {
    id: Date.now() + Math.random(),
    date: "",
    time: "20:00",
    character1: "",
    character2: "",
    character3: "원태민",
    watched: false,
    seat: "Z0",
    price: 0,
    discount: 0,
    booking: "",
    rating: "",
    memo: "",
  };
}

const SAMPLE_ROWS = [
  {
    id: 1,
    date: "2026-09-05",
    time: "14:00",
    character1: "홍길동",
    character2: "김영희",
    character3: "이철수",
    watched: true,
    seat: "B12",
    price: 70000,
    discount: 10000,
    booking: "인터파크",
    rating: "5",
    memo: "첫 관극",
  },
  {
    id: 2,
    date: "2026-09-06",
    time: "18:00",
    character1: "홍길동",
    character2: "박민수",
    character3: "이철수",
    watched: true,
    seat: "C10",
    price: 70000,
    discount: 0,
    booking: "멜론티켓",
    rating: "4.5",
    memo: "",
  },
  {
    id: 3,
    date: "2026-09-12",
    time: "14:00",
    character1: "김철수",
    character2: "김영희",
    character3: "이철수",
    watched: false,
    seat: "",
    price: 70000,
    discount: 0,
    booking: "",
    rating: "",
    memo: "예매했지만 미관극",
  },
];

function loadSavedData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        info: DEFAULT_INFO,
        rows: SAMPLE_ROWS,
      };
    }

    const parsed = JSON.parse(saved);

    return {
      info: parsed.info || DEFAULT_INFO,
      rows: Array.isArray(parsed.rows) ? parsed.rows : [],
    };
  } catch {
    return {
      info: DEFAULT_INFO,
      rows: SAMPLE_ROWS,
    };
  }
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("ko-KR");
}

function formatDate(date) {
  if (!date) return "-";

  const d = new Date(`${date}T00:00:00`);
  const day = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];

  return `${date.replaceAll("-", ".")} (${day})`;
}

function App() {
  const saved = useMemo(() => loadSavedData(), []);

  const [info, setInfo] = useState(saved.info);
  const [rows, setRows] = useState(saved.rows);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedSeat, setSelectedSeat] = useState("");
  const [showOnlyWatchedSeats, setShowOnlyWatchedSeats] = useState(false);

  // -----------------------------
  // localStorage 자동 저장
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        info,
        rows,
      })
    );
  }, [info, rows]);

  // -----------------------------
  // 배우 통계
  // -----------------------------

  const actorStats = useMemo(() => {
    return CHARACTER_FIELDS.map(({ key, label }) => {
      const stats = {};

      rows.forEach((row) => {
        const actor = String(row[key] || "").trim();
        if (!actor) return;

        if (!stats[actor]) {
          stats[actor] = { name: actor, appearances: 0, watched: 0 };
        }

        stats[actor].appearances += 1;
        if (row.watched) stats[actor].watched += 1;
      });

      return {
        key,
        label,
        actors: Object.values(stats).sort((a, b) => {
          if (b.watched !== a.watched) return b.watched - a.watched;
          return a.name.localeCompare(b.name, "ko");
        }),
      };
    });
  }, [rows]);

  const totalActorCount = actorStats.reduce(
    (sum, character) => sum + character.actors.length,
    0
  );

  // -----------------------------
  // 기본 통계
  // -----------------------------

  const watchedRows = useMemo(
    () => rows.filter((row) => row.watched),
    [rows]
  );

  const totalPerformances = rows.length;

  const totalWatched = watchedRows.length;

  const totalSpent = useMemo(() => {
    return watchedRows.reduce((sum, row) => {
      const price = Number(row.price || 0);
      const discount = Number(row.discount || 0);

      return sum + Math.max(price - discount, 0);
    }, 0);
  }, [watchedRows]);

  const averagePrice =
    totalWatched > 0 ? Math.round(totalSpent / totalWatched) : 0;

  const attendanceRate =
    totalPerformances > 0
      ? Math.round((totalWatched / totalPerformances) * 100)
      : 0;

  // -----------------------------
  // 좌석 Heatmap
  // -----------------------------

  const seatCounts = useMemo(() => {
    const counts = {};

    watchedRows.forEach((row) => {
      if (!row.seat) return;

      const seat = row.seat.toUpperCase().trim();

      counts[seat] = (counts[seat] || 0) + 1;
    });

    return counts;
  }, [watchedRows]);

  const maxSeatCount = Math.max(
    1,
    ...Object.values(seatCounts)
  );

  function getSeatIntensity(count) {
    // 범례의 0~5+와 동일하게 실제 누적 관극 횟수를 그대로 색상 단계에 매핑합니다.
    if (!count) return 0;
    return Math.min(5, count);
  }

  // -----------------------------
  // 검색 / 필터
  // -----------------------------

  const filteredRows = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return rows.filter((row) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "watched" && row.watched) ||
        (filter === "unwatched" && !row.watched);

      if (!matchesFilter) return false;

      if (!keyword) return true;

      const text = [
        row.date,
        row.time,
        row.character1,
        row.character2,
        row.character3,
        row.seat,
        row.booking,
        row.memo,
      ]
        .join(" ")
        .toLowerCase();

      return text.includes(keyword);
    });
  }, [rows, search, filter]);

  // -----------------------------
  // 행 수정
  // -----------------------------

  function updateRow(id, field, value) {
    setRows((prev) =>
      prev.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]:
                field === "price" || field === "discount"
                  ? Number(value)
                  : value,
            }
          : row
      )
    );
  }

  // -----------------------------
  // 행 추가
  // -----------------------------

  function addRow() {
    setRows((prev) => [...prev, createEmptyRow()]);
  }

  // -----------------------------
  // 행 삭제
  // -----------------------------

  function deleteRow(id) {
    const confirmed = window.confirm(
      "이 관극 기록을 삭제할까요?"
    );

    if (!confirmed) return;

    setRows((prev) => prev.filter((row) => row.id !== id));
  }

  // -----------------------------
  // 좌석 클릭
  // -----------------------------

  function handleSeatClick(seat) {
    // 좌석 선택/선택 표시만 유지하고, 관극 기록의 좌석 입력은 하지 않습니다.
    setSelectedSeat(seat);
  }

  // -----------------------------
  // 데이터 초기화
  // -----------------------------

  function resetData() {
    const confirmed = window.confirm(
      "모든 관극 기록을 삭제하고 처음 상태로 되돌릴까요?"
    );

    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);

    setInfo(DEFAULT_INFO);
    setRows([]);
    setSelectedSeat("");
  }

  // -----------------------------
  // 데이터 저장
  // -----------------------------

  function saveData() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        info,
        rows,
      })
    );
    window.alert("공연 정보와 관극 기록을 저장했습니다.");
  }

  // -----------------------------
  // 샘플 데이터
  // -----------------------------

  function loadSample() {
    const confirmed = window.confirm(
      "현재 기록을 샘플 데이터로 교체할까요?"
    );

    if (!confirmed) return;

    setInfo({
      title: "뮤지컬 샘플",
      theater: "예술의전당",
      startDate: "2026-09-01",
      endDate: "2026-10-31",
    });

    setRows(SAMPLE_ROWS);
  }

  // -----------------------------
  // CSV 복사
  // -----------------------------

  async function copyCSV() {
    const header = [
      "날짜",
      "시간",
      "김우진",
      "윤심덕",
      "사내",
      "관극여부",
      "좌석",
      "정가",
      "할인",
      "실결제",
      "예매처",
      "평점",
      "비고",
    ];

    const body = rows.map((row) => [
      row.date,
      row.time,
      row.character1,
      row.character2,
      row.character3,
      row.watched ? "관극" : "미관극",
      row.seat,
      row.price,
      row.discount,
      Math.max(
        Number(row.price || 0) -
          Number(row.discount || 0),
        0
      ),
      row.booking,
      row.rating,
      row.memo,
    ]);

    const csv = [header, ...body]
      .map((line) =>
        line
          .map((value) =>
            `"${String(value ?? "").replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    try {
      await navigator.clipboard.writeText(csv);

      window.alert(
        "전체 관극 기록이 CSV 형식으로 클립보드에 복사되었습니다."
      );
    } catch {
      window.alert(
        "클립보드 복사에 실패했습니다."
      );
    }
  }

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f5f5f7;
          color: #222;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            "Noto Sans KR",
            sans-serif;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        .app {
          min-height: 100vh;
          padding: 28px;
        }

        .container {
          max-width: 1800px;
          margin: 0 auto;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 20px;
          margin-bottom: 22px;
        }

        .title-area h1 {
          margin: 0;
          font-size: 30px;
          letter-spacing: -1px;
        }

        .subtitle {
          margin-top: 7px;
          color: #777;
          font-size: 14px;
        }

        .actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .button {
          border: 1px solid #ddd;
          background: white;
          border-radius: 9px;
          padding: 9px 13px;
          font-size: 13px;
        }

        .button:hover {
          background: #f7f7f7;
        }

        .button.primary {
          background: #222;
          color: white;
          border-color: #222;
        }

        .button.danger {
          color: #c33;
        }

        .info-card {
          background: white;
          border: 1px solid #e8e8e8;
          border-radius: 14px;
          padding: 18px;
          margin-bottom: 16px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1fr;
          gap: 12px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field label {
          font-size: 11px;
          color: #888;
          font-weight: 600;
        }

        .input,
        .select,
        .textarea {
          width: 100%;
          font-size: 12px;
          border: 1px solid #ddd;
          border-radius: 7px;
          background: white;
          padding: 8px 9px;
          outline: none;
          min-width: 0;
        }

        .input:focus,
        .select:focus,
        .textarea:focus {
          border-color: #999;
        }

        .textarea {
          resize: vertical;
          min-height: 36px;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 16px;
        }

        .summary-card {
          background: white;
          border: 1px solid #e8e8e8;
          border-radius: 14px;
          padding: 17px;
          min-height: 105px;
        }

        .summary-label {
          color: #888;
          font-size: 12px;
          margin-bottom: 9px;
        }

        .summary-value {
          font-size: 25px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .summary-unit {
          font-size: 12px;
          font-weight: 500;
          color: #777;
          margin-left: 3px;
        }

        .main-grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .panel {
          background: white;
          border: 1px solid #e8e8e8;
          border-radius: 14px;
          overflow: hidden;
        }

        .panel-header {
          padding: 16px 18px;
          border-bottom: 1px solid #eee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .panel-title {
          font-weight: 700;
          font-size: 15px;
        }

        .panel-description {
          color: #888;
          font-size: 12px;
          margin-top: 4px;
        }

        .table-tools {
          padding: 12px 14px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          border-bottom: 1px solid #eee;
        }

        .table-tools .input {
          max-width: 230px;
        }

        .table-wrapper {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1250px;
        }

        th {
          background: #fafafa;
          color: #666;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
          padding: 10px 6px;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #f0f0f0;
        }

        td {
          padding: 6px;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #f3f3f3;
          vertical-align: middle;
        }

        tr:hover td {
          background: #fcfcfc;
        }

        .cell-input {
          width: 100%;
          min-width: 0;
          font-size: 12px;
          border: 1px solid transparent;
          background: transparent;
          padding: 7px 5px;
          border-radius: 5px;
        }

        .cell-input:hover {
          border-color: #ddd;
          background: white;
        }

        .cell-input:focus {
          border-color: #aaa;
          background: white;
          outline: none;
        }

        .date-input {
          width: 100px;
          text-align: center;
        }

        .time-input {
          width: 100px;
          text-align: center;
        }

        .actor-input {
          width: 60px;
          text-align: center;
        }

        .price-input {
          width: 70px;
          text-align: right;
        }

        .booking-input {
          width: 70px;
        }

        .memo-input {
          width: 180px;
        }

        .seat-input {
          width: 50px;
          text-align: center;
          font-weight: 700;
        }

        .auto-seat-input {
          color: #777;
        }

        .star-rating {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 1px;
          white-space: nowrap;
        }

        .star-rating-button {
          position: relative;
          width: 18px;
          height: 22px;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          font-size: 18px;
          line-height: 22px;
          font-family: inherit;
        }

        .star-rating-button:focus-visible {
          outline: 2px solid #999;
          outline-offset: 1px;
          border-radius: 3px;
        }

        .star-rating-empty,
        .star-rating-fill {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .star-rating-empty {
          color: #ddd;
        }

        .star-rating-fill {
          color: transparent;
          background: linear-gradient(90deg, #f2c94c var(--fill, 0%), transparent var(--fill, 0%));
          -webkit-background-clip: text;
          background-clip: text;
        }

        .watched-checkbox {
          width: 17px;
          height: 17px;
        }

        .real-price {
          width: 50px;
          min-width: 50px;
          text-align: right;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .delete-button {
          border: 0;
          background: transparent;
          color: #aaa;
          font-size: 16px;
        }

        .delete-button:hover {
          color: #d44;
        }

        .actor-section {
          padding: 18px;
          border-top: 1px solid #eee;
        }

        .actor-section > .panel-title {
          text-align: center;
        }

        .character-stat-list {
          display: block;
        }

        .character-stat-group {
          margin-top: 16px;
        }

        .character-stat-group:first-child {
          margin-top: 12px;
        }

        .character-stat-title {
          font-size: 12px;
          font-weight: 700;
          color: #555;
          margin-bottom: 8px;
          padding-bottom: 6px;
          border-bottom: 1px solid #eee;
        }

        .character-empty {
          color: #aaa;
          font-size: 12px;
          padding: 4px 0;
        }

        .actor-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
        }

        .actor-card {
          border: 1px solid #e7e7e7;
          background: #fafafa;
          border-radius: 10px;
          padding: 10px 12px;
          min-width: 145px;
        }

        .actor-name {
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 5px;
        }

        .actor-count {
          font-size: 12px;
          color: #777;
        }

        .actor-count strong {
          color: #222;
          font-size: 15px;
        }

        .seat-panel {
          position: static;
        }

        .stage {
          margin: 20px 35px 18px;
          border-radius: 5px 5px 18px 18px;
          background: #222;
          color: white;
          text-align: center;
          padding: 9px;
          font-size: 11px;
          letter-spacing: 4px;
        }

        .seat-map {
          padding: 0 18px 18px;
          overflow-x: auto;
        }

        .payco-map {
  width: max-content;
  min-width: 0;
  margin-left: auto;
  margin-right: auto;
}

        .payco-stage {
          margin: 20px auto 18px;
          width: 34%;
          min-width: 230px;
          border-radius: 5px 5px 18px 18px;
          background: #222;
          color: white;
          text-align: center;
          padding: 9px;
          font-size: 11px;
          letter-spacing: 4px;
        }

        .payco-seat-row {
          display: grid;
          grid-template-columns: 50px 130px 24px 225px 24px 149px 50px;
          column-gap: 0px;
          align-items: center;
          min-height: 18px;
          margin-bottom: 1px;
          width: max-content;
        }

        .payco-block {
          display: flex;
          align-items: center;
          gap: 3px;
          min-height: 18px;
        }

        .payco-block-left {
          justify-content: flex-end;
        }

        .r-left-row {
          gap: 0;
        }

        .r-left-front,
        .r-left-back {
          display: flex;
          align-items: center;
          gap: 3px;
        }

        .r-left-gap {
          width: 24px;
          flex: 0 0 24px;
        }

        .payco-block-center.s-row {
          justify-content: flex-end;
               }


        .payco-seat {
          flex: 0 0 16px;
          width: 16px;
          height: 16px;
          padding: 0;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          text-align: center;
          box-sizing: border-box;
          cursor: default;
          user-select: none;
        }

        .payco-seat.r-shift-seat {
          transform: translateX(19px);
        }

        .payco-seat.r-shift-seat:hover {
          transform: translateX(19px);
        }

        .payco-seat.wheelchair {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8px;
          color: #999;
          background: #fafafa;
          border: 1px solid #e4e4e4;
          border-radius: 3px;
        }

        .payco-row-label-left,
        .payco-row-label-right {
          font-size: 10px;
          color: #888;
          font-weight: 700;
          text-align: center;
        }

        .payco-spacer {
          min-width: 18px;
        }

        .seat-row {
          display: grid;
          grid-template-columns: 24px repeat(16, 1fr);
          gap: 3px;
          margin-bottom: 4px;
        }

        .row-label {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: #888;
          font-weight: 700;
        }

        .seat {
          aspect-ratio: 1;
          border: 1px solid #e4e4e4;
          border-radius: 3px;
          background: #fafafa;
          color: #999;
          padding: 0;
          font-size: 8px;
          min-width: 0;
          transition: transform 0.1s;
        }

        .seat:hover {
          transform: scale(1.12);
          border-color: #777;
          z-index: 2;
        }

        .seat.selected {
          outline: 2px solid #222;
          outline-offset: 1px;
          z-index: 3;
        }

        .seat.level-1 {
          background: #f0f0f0;
          color: #666;
        }

        .seat.level-2 {
          background: #d9d9d9;
          color: #444;
        }

        .seat.level-3 {
          background: #bcbcbc;
          color: #222;
        }

        .seat.level-4 {
          background: #8f8f8f;
          color: white;
        }

        .seat.level-5 {
          background: #222;
          color: white;
        }


        .seat-legend {
          padding: 0 18px 18px;
          text-align: center;
        }

        .legend-title {
          font-size: 11px;
          color: #888;
          margin-bottom: 8px;
          text-align: center;
        }

        .legend {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .legend-box {
          width: 18px;
          height: 18px;
          border-radius: 3px;
          border: 1px solid #ddd;
        }

        .legend-text {
          font-size: 10px;
          color: #888;
          margin-right: 5px;
        }

        .seat-summary {
          margin: 0 18px 18px;
          padding: 12px;
          background: #fafafa;
          border-radius: 9px;
          font-size: 12px;
          color: #777;
        }

        .seat-summary strong {
          color: #222;
        }

        .empty {
          text-align: center;
          padding: 45px 20px;
          color: #aaa;
          font-size: 13px;
        }

        .table-footer {
          padding: 12px 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #eee;
          color: #888;
          font-size: 12px;
        }

        .footer-actions {
          display: flex;
          gap: 7px;
        }

        .notice {
          padding: 10px 14px;
          background: #fafafa;
          border-bottom: 1px solid #eee;
          color: #888;
          font-size: 11px;
        }

        @media (max-width: 1300px) {
          .summary-grid {
            grid-template-columns: repeat(3, 1fr);
          }

        }

        @media (max-width: 800px) {
          .app {
            padding: 14px;
          }

          .topbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .info-grid {
            grid-template-columns: 1fr 1fr;
          }

          .summary-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 520px) {
          .info-grid {
            grid-template-columns: 1fr;
          }

          .summary-grid {
            grid-template-columns: 1fr 1fr;
          }

          .summary-card {
            min-height: 90px;
          }

          .summary-value {
            font-size: 20px;
          }

          .payco-seat-row {
            grid-template-columns: 18px minmax(0, 1fr) 10px minmax(0, 1fr) 10px minmax(0, 1fr) 18px;
            column-gap: 5px;
          }

          .payco-seat {
            flex-basis: 14px;
            width: 14px;
            height: 14px;
          }
        }
      `}</style>

      <div className="app">
        <div className="container">

          {/* =========================
              HEADER
          ========================== */}

          <div className="topbar">
            <div className="title-area">
              <h1>🚢사의찬미🌊</h1>
              <div className="subtitle">
                2026 사의찬미(8연) 관극 정산
              </div>
            </div>

            <div className="actions">
              <button
                className="button"
                onClick={saveData}
              >
                저장
              </button>

              <button
                className="button"
                onClick={loadSample}
              >
                샘플 불러오기
              </button>

              <button
                className="button"
                onClick={copyCSV}
              >
                CSV 복사
              </button>

              <button
                className="button danger"
                onClick={resetData}
              >
                전체 초기화
              </button>
            </div>
          </div>

          {/* =========================
              작품 정보
          ========================== */}

          <div className="info-card">
            <div className="info-grid">

              <div className="field">
                <label>작품명</label>
                <input
                  className="input"
                  value={info.title}
                  onChange={(e) =>
                    setInfo((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="예: 레미제라블"
                />
              </div>

              <div className="field">
                <label>공연장</label>
                <input
                  className="input"
                  value={info.theater}
                  onChange={(e) =>
                    setInfo((prev) => ({
                      ...prev,
                      theater: e.target.value,
                    }))
                  }
                  placeholder="예: 블루스퀘어 신한카드홀"
                />
              </div>

              <div className="field">
                <label>공연 시작일</label>
                <input
                  type="date"
                  className="input"
                  value={info.startDate}
                  onChange={(e) =>
                    setInfo((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="field">
                <label>공연 종료일</label>
                <input
                  type="date"
                  className="input"
                  value={info.endDate}
                  onChange={(e) =>
                    setInfo((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                />
              </div>

            </div>
          </div>

          {/* =========================
              SUMMARY
          ========================== */}

          <div className="summary-grid">

            <div className="summary-card">
              <div className="summary-label">
                전체 공연 회차
              </div>
              <div className="summary-value">
                {formatNumber(totalPerformances)}
                <span className="summary-unit">회</span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-label">
                나의 관극
              </div>
              <div className="summary-value">
                {formatNumber(totalWatched)}
                <span className="summary-unit">회</span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-label">
                관극률
              </div>
              <div className="summary-value">
                {attendanceRate}
                <span className="summary-unit">%</span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-label">
                총 관극 비용
              </div>
              <div className="summary-value">
                {formatNumber(totalSpent)}
                <span className="summary-unit">원</span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-label">
                평균 1회 비용
              </div>
              <div className="summary-value">
                {formatNumber(averagePrice)}
                <span className="summary-unit">원</span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-label">
                등록 배우
              </div>
              <div className="summary-value">
                {formatNumber(totalActorCount)}
                <span className="summary-unit">명</span>
              </div>
            </div>

          </div>

          {/* =========================
              MAIN
          ========================== */}

          <div className="main-grid">

{/* =====================
                  ACTOR STATS
              ====================== */}

              <div className="panel">
                <div className="actor-section">

                <div className="panel-title">
                  배우별 관람 통계
                </div>

                <div className="panel-description">
                  관람한 회차 / 해당 배우가 출연한 전체 회차
                </div>

                {actorStats.length === 0 ? (
                  <div
                    style={{
                      marginTop: 15,
                      color: "#aaa",
                      fontSize: 13,
                    }}
                  >
                    아직 등록된 배우가 없습니다.
                  </div>
                ) : (
                  <div className="character-stat-list">

                    {actorStats.map((character) => (
                      <div className="character-stat-group" key={character.key}>
                        <div className="character-stat-title">{character.label}</div>

                        {character.actors.length === 0 ? (
                          <div className="character-empty">등록된 배우가 없습니다.</div>
                        ) : (
                          <div className="actor-list">
                            {character.actors.map((actor) => (
                              <div className="actor-card" key={`${character.key}-${actor.name}`}>
                                <div className="actor-name">{actor.name}</div>
                                <div className="actor-count">
                                  <strong>{actor.watched}</strong>
                                  {" / "}
                                  {actor.appearances}회
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                  </div>
                )}

              </div>

            </div>

            
{/* =====================
                SEAT HEATMAP
            ====================== */}

            <div className="panel seat-panel">

              <div className="panel-header">
                <div>
                  <div className="panel-title">
                    좌석 Heatmap
                  </div>

                  <div className="panel-description">
                    많이 앉은 좌석일수록 진하게 표시됩니다.
                  </div>
                </div>
              </div>

              <div className="payco-stage">
                STAGE
              </div>

              <div className="seat-map">
                <div className="payco-map">
                  {SEAT_ROWS.map((row) => {
                    const layout = PAYCO_SEAT_LAYOUT[row];

                    const renderSeat = (number) => {
                      const seatName = `${row}${number}`;
                      const count = seatCounts[seatName] || 0;
                      const level = getSeatIntensity(count);

                      return (
                        <button
                          key={seatName}
                          type="button"
                          className={`seat payco-seat ${row === "R" && number >= 3 && number <= 7 ? "r-shift-seat" : ""} ${level ? `level-${level}` : ""} ${selectedSeat === seatName ? "selected" : ""}`}
                          onClick={() => handleSeatClick(seatName)}
                          title={count ? `${seatName}: ${count}회` : `${seatName}: 관극 기록 없음`}
                        >
                          {number}
                        </button>
                      );
                    };

                    return (
                      <div className="payco-seat-row" key={row}>
                        <div className="payco-row-label-left">{row}</div>

                        <div className={`payco-block payco-block-left ${row === "S" ? "s-left-row" : ""}`}>
                          {row === "B" && (
                            <div className="payco-seat wheelchair" title="휠체어석">W</div>
                          )}
                          {row === "S" ? null : layout.left.map(renderSeat)}
                        </div>

                        <div className="payco-spacer" />

                        <div className={`payco-block payco-block-center ${row === "S" ? "s-row" : ""}`}>
                          {layout.center.map(renderSeat)}
                        </div>

                        <div className="payco-spacer" />

                        <div className="payco-block payco-block-right">
                          {layout.right.map(renderSeat)}
                        </div>

                        <div className="payco-row-label-right">{row}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedSeat && (
                <div className="seat-summary">
                  선택한 좌석 {" "}
                  <strong>{selectedSeat}</strong>
                  {" · "}
                  지금까지 {" "}
                  <strong>
                    {seatCounts[selectedSeat] || 0}
                  </strong>
                  회 관극
                </div>
              )}

              <div className="seat-legend">

                <div className="legend-title">
                  관극 횟수
                </div>

                <div className="legend">

                  <div className="legend-box" />

                  <span className="legend-text">
                    0
                  </span>

                  {[1, 2, 3, 4, 5].map(
                    (level) => (
                      <React.Fragment
                        key={level}
                      >
                        <div
                          className={`legend-box seat level-${level}`}
                        />
                        <span className="legend-text">
                          {level === 5
                            ? "5+"
                            : level}
                        </span>
                      </React.Fragment>
                    )
                  )}

                </div>

              </div>

              <div className="seat-summary">
                <div>
                  가장 많이 앉은 좌석
                </div>

                <strong>
                  {Object.entries(seatCounts).length
                    ? Object.entries(seatCounts).sort(
                        (a, b) => b[1] - a[1]
                      )[0][0]
                    : "-"}
                </strong>

                {Object.entries(seatCounts).length > 0 && (
                  <>
                    {" · "}
                    {
                      Object.entries(seatCounts).sort(
                        (a, b) => b[1] - a[1]
                      )[0][1]
                    }
                    회
                  </>
                )}
              </div>

            </div>

{/* =====================
                TABLE
            ====================== */}

            <div className="panel">

              <div className="panel-header">
                <div>
                  <div className="panel-title">
                    관극 기록
                  </div>
                  <div className="panel-description">
                    날짜별 캐스팅과 관극 여부, 좌석, 비용을 기록하세요.
                  </div>
                </div>

                <button
                  className="button primary"
                  onClick={addRow}
                >
                  + 회차 추가
                </button>
              </div>

              <div className="notice">
                💡 좌석별 관극 횟수에 따라 Heatmap이 진하게 표시됩니다.
              </div>

              <div className="table-tools">

                <input
                  className="input"
                  placeholder="배우, 좌석, 날짜, 메모 검색"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

                <select
                  className="select"
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                >
                  <option value="all">
                    전체 회차
                  </option>
                  <option value="watched">
                    관극한 회차
                  </option>
                  <option value="unwatched">
                    미관극 회차
                  </option>
                </select>

              </div>

              <div className="table-wrapper">

                {filteredRows.length === 0 ? (
                  <div className="empty">
                    등록된 회차가 없습니다.
                    <br />
                    <button
                      className="button"
                      style={{ marginTop: 12 }}
                      onClick={addRow}
                    >
                      첫 회차 추가
                    </button>
                  </div>
                ) : (
                  <table>

                    <thead>
                      <tr>
                        <th>날짜</th>
                        <th>시간</th>
                        <th>김우진</th>
                        <th>윤심덕</th>
                        <th>사내</th>
                        <th>관극</th>
                        <th>좌석</th>
                        <th>정가</th>
                        <th>할인</th>
                        <th>실결제</th>
                        <th>예매처</th>
                        <th>평점</th>
                        <th>비고</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>

                      {filteredRows.map((row) => {

                        const realPrice = Math.max(
                          Number(row.price || 0) -
                            Number(row.discount || 0),
                          0
                        );

                        return (
                          <tr key={row.id}>

                            <td>
                              <input
                                type="date"
                                className="cell-input date-input"
                                value={row.date}
                                onChange={(e) =>
                                  updateRow(
                                    row.id,
                                    "date",
                                    e.target.value
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="time"
                                className="cell-input time-input"
                                value={row.time}
                                onChange={(e) =>
                                  updateRow(
                                    row.id,
                                    "time",
                                    e.target.value
                                  )
                                }
                              />
                            </td>

                            {CHARACTER_FIELDS.map(
                              ({ key }) => (
                                <td key={key}>
                                  <input
                                    className="cell-input actor-input"
                                    value={row[key]}
                                    placeholder="배우명"
                                    onChange={(e) =>
                                      updateRow(
                                        row.id,
                                        key,
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                              )
                            )}

                            <td style={{ textAlign: "center" }}>
                              <input
                                type="checkbox"
                                className="watched-checkbox"
                                checked={row.watched}
                                onChange={(e) =>
                                  updateRow(
                                    row.id,
                                    "watched",
                                    e.target.checked
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                className={`cell-input seat-input ${row.seat === "Z0" ? "auto-seat-input" : ""}`}
                                value={row.seat}
                                placeholder="B12"
                                onChange={(e) =>
                                  updateRow(
                                    row.id,
                                    "seat",
                                    e.target.value.toUpperCase()
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                inputMode="numeric"
                                className="cell-input price-input"
                                value={row.price === "" ? "" : formatNumber(row.price)}
                                onChange={(e) =>
                                  updateRow(
                                    row.id,
                                    "price",
                                    e.target.value.replace(/,/g, "")
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                inputMode="numeric"
                                className="cell-input price-input"
                                value={row.discount === "" ? "" : formatNumber(row.discount)}
                                onChange={(e) =>
                                  updateRow(
                                    row.id,
                                    "discount",
                                    e.target.value.replace(/,/g, "")
                                  )
                                }
                              />
                            </td>

                            <td>
                              <div className="real-price">
                                {formatNumber(realPrice)}
                              </div>
                            </td>

                            <td>
                              <input
                                className="cell-input booking-input"
                                value={row.booking}
                                placeholder="예매처"
                                onChange={(e) =>
                                  updateRow(
                                    row.id,
                                    "booking",
                                    e.target.value
                                  )
                                }
                              />
                            </td>

                            <td>
                              <div
                                className="star-rating"
                                role="group"
                                aria-label={`평점 ${row.rating || 0}점`}
                              >
                                {[1, 2, 3, 4, 5].map((star) => {
                                  const rating = Number(row.rating || 0);
                                  const fill = Math.max(
                                    0,
                                    Math.min(100, (rating - (star - 1)) * 100)
                                  );

                                  return (
                                    <button
                                      key={star}
                                      type="button"
                                      className="star-rating-button"
                                      aria-label={`${star - 0.5}점 또는 ${star}점`}
                                      title={`${star - 0.5}점 / ${star}점`}
                                      onClick={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        const half =
                                          e.clientX - rect.left < rect.width / 2;
                                        const nextRating = half
                                          ? star - 0.5
                                          : star;
                                        updateRow(row.id, "rating", nextRating);
                                      }}
                                    >
                                      <span className="star-rating-empty">★</span>
                                      <span
                                        className="star-rating-fill"
                                        style={{ "--fill": `${fill}%` }}
                                      >
                                        ★
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </td>

                            <td>
                              <input
                                className="cell-input memo-input"
                                value={row.memo}
                                placeholder="메모"
                                onChange={(e) =>
                                  updateRow(
                                    row.id,
                                    "memo",
                                    e.target.value
                                  )
                                }
                              />
                            </td>

                            <td>
                              <button
                                className="delete-button"
                                onClick={() =>
                                  deleteRow(row.id)
                                }
                                title="삭제"
                              >
                                ×
                              </button>
                            </td>

                          </tr>
                        );
                      })}

                    </tbody>
                  </table>
                )}

              </div>

              <div className="table-footer">

                <div>
                  {filteredRows.length}개 표시
                  {" · "}
                  총 {rows.length}개 회차
                </div>

                <div className="footer-actions">
                  <button
                    className="button"
                    onClick={addRow}
                  >
                    + 회차 추가
                  </button>
                </div>

              </div>

              
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;