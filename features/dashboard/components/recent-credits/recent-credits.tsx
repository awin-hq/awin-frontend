// import { Info } from "lucide-react";

// import { Avatar } from "@/components/dashboard/avatar";
// import { EmptyState } from "@/components/dashboard/empty-state";
// import { formatNaira } from "@/lib/format";

// import styles from "./recent-credits.module.css";

// export type RecentCredit = {
//   id: string;
//   name: string;
//   item?: string;
//   amount: number;
//   date?: string;
//   paymentDueDate?: string;
//   notes?: string;
// };

// type RecentCreditsProps = {
//   credits: RecentCredit[];
// };

// export function RecentCredits({ credits }: RecentCreditsProps) {
//   return (
//     <section className={styles.section}>
//       <div className={styles.header}>
//         <div>
//           <h3 className={styles.title}>Recent Credits</h3>
//           <p className={styles.subtitle}>
//             Latest credit sales and upcoming due dates.
//           </p>
//         </div>

//         {credits.length > 0 ? (
//           <span className={styles.countBadge}>
//             {credits.length} recent
//           </span>
//         ) : null}
//       </div>

//       {credits.length > 0 ? (
//         <ul className={styles.list}>
//           {credits.map((credit) => (
//             <li key={credit.id} className={styles.item}>
//               <Avatar name={credit.name} />

//               <div className={styles.info}>
//                 <span className={styles.name}>{credit.name}</span>

//                 <div className={styles.metaRow}>
//                   {credit.item ? (
//                     <span className={styles.meta}>{credit.item}</span>
//                   ) : null}

//                   {credit.paymentDueDate ? (
//                     <span className={styles.duePill}>
//                       Due {credit.paymentDueDate}
//                     </span>
//                   ) : null}
//                 </div>

//                 {credit.notes ? (
//                   <span className={styles.note}>{credit.notes}</span>
//                 ) : null}
//               </div>

//               <div className={styles.right}>
//                 <span className={styles.amount}>
//                   - {formatNaira(credit.amount, 2)} NGN
//                 </span>
//                 {credit.date ? (
//                   <span className={styles.date}>{credit.date}</span>
//                 ) : null}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className={styles.emptyWrapper}>
//           <EmptyState
//             layout="center"
//             icon={<Info size={28} aria-hidden="true" />}
//             title="No recent credits yet"
//             description="Record a credit sale and it will appear here in the dashboard."
//           />
//         </div>
//       )}
//     </section>
//   );
// }


import { Info } from "lucide-react";

import { Avatar } from "@/components/dashboard/avatar";
import { EmptyState } from "@/components/dashboard/empty-state";
import { formatNaira } from "@/lib/format";

import styles from "./recent-credits.module.css";

export type RecentCredit = {
  id: string;
  name: string;
  item?: string;
  amount: number;
  date?: string;
  paymentDueDate?: string;
  notes?: string;
};

type RecentCreditsProps = {
  credits: RecentCredit[];
};

export function RecentCredits({ credits }: RecentCreditsProps) {
  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <div>
          <h3 className={styles.title}>Recent Credits</h3>

          <p className={styles.subtitle}>
            Latest credit sales and upcoming due dates.
          </p>
        </div>

        {credits.length > 0 && (
          <span className={styles.countBadge}>
            {credits.length} recent
          </span>
        )}
      </header>

      {credits.length > 0 ? (
        <ul className={styles.list}>
          {credits.map((credit) => (
            <li key={credit.id} className={styles.item}>
              <Avatar name={credit.name} />

              <div className={styles.info}>
                <span className={styles.name}>
                  {credit.name}
                </span>

                <div className={styles.metaRow}>
                  {credit.item && (
                    <span className={styles.meta}>
                      {credit.item}
                    </span>
                  )}

                  {credit.paymentDueDate && (
                    <span className={styles.duePill}>
                      Due {credit.paymentDueDate}
                    </span>
                  )}
                </div>

                {credit.notes && (
                  <span className={styles.note}>
                    {credit.notes}
                  </span>
                )}
              </div>

              <div className={styles.right}>
                <span className={styles.amount}>
                  - {formatNaira(credit.amount, 2)}
                </span>

                {credit.date && (
                  <span className={styles.date}>
                    {credit.date}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyWrapper}>
          <EmptyState
            layout="center"
            icon={<Info size={28} aria-hidden="true" />}
            title="No recent credits yet"
            description="Record a credit sale and it will appear here in the dashboard."
          />
        </div>
      )}
    </section>
  );
}