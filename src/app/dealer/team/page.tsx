import type { Metadata } from "next";
import {
  MailPlus,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Field,
  inputCls,
  labelCls,
  selectCls,
} from "@/components/ui";
import { SaveButton } from "@/components/save-button";
import {
  PageTitle,
  Panel,
  Stat,
  tableClass,
  tdClass,
  thClass,
} from "@/components/dashboard";
import { STAFF } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Team",
};

const roleLabel: Record<string, string> = {
  DEALER_OWNER: "Owner",
  DEALER_MANAGER: "Manager",
  DEALER_STAFF: "Staff",
};

const roleTone: Record<string, "dark" | "volt" | "neutral"> = {
  DEALER_OWNER: "dark",
  DEALER_MANAGER: "volt",
  DEALER_STAFF: "neutral",
};

export default function DealerTeamPage() {
  const total = STAFF.length;
  const active = STAFF.filter((member) => member.status === "Active").length;
  const invited = STAFF.filter((member) => member.status === "Invited").length;
  const roles = new Set(STAFF.map((member) => member.role)).size;

  return (
    <div className="space-y-6">
      <PageTitle
        title="Team"
        description="Give your sales desk the right access to inventory and leads."
        action={<Badge tone="jade">{active} active seats</Badge>}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label="Members"
          value={String(total)}
          hint="across this dealership"
          icon={<Users className="size-4" />}
        />
        <Stat
          label="Active"
          value={String(active)}
          delta="+1"
          hint="signed in this week"
          icon={<UserCheck className="size-4" />}
        />
        <Stat
          label="Invited"
          value={String(invited)}
          hint="awaiting acceptance"
          icon={<MailPlus className="size-4" />}
        />
        <Stat
          label="Roles"
          value={String(roles)}
          hint="owner · manager · staff"
          icon={<ShieldCheck className="size-4" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel title="Members" description="Adaeze Nwosu is the account owner.">
          <div className="-mx-1 overflow-x-auto">
            <table className={tableClass}>
              <thead>
                <tr>
                  <th className={thClass}>Member</th>
                  <th className={thClass}>Role</th>
                  <th className={thClass}>Status</th>
                  <th className={cn(thClass, "hidden sm:table-cell")}>
                    Last active
                  </th>
                </tr>
              </thead>
              <tbody>
                {STAFF.map((member) => (
                  <tr key={member.email} className="border-t border-line">
                    <td className={tdClass}>
                      <div className="flex items-center gap-3">
                        <Avatar name={member.name} className="size-8" />
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-medium text-ink">
                            {member.name}
                          </p>
                          <p className="truncate text-[11.5px] text-ink/40">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className={tdClass}>
                      <Badge tone={roleTone[member.role] ?? "neutral"}>
                        {roleLabel[member.role] ?? member.role}
                      </Badge>
                    </td>
                    <td className={tdClass}>
                      <Badge
                        tone={member.status === "Active" ? "jade" : "neutral"}
                      >
                        {member.status}
                      </Badge>
                    </td>
                    <td
                      className={cn(
                        tdClass,
                        "hidden whitespace-nowrap text-[12px] text-ink/45 sm:table-cell",
                      )}
                    >
                      {member.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 border-t border-line pt-4 text-[11px] text-ink/30">
            Demo roster · invitations are not sent.
          </p>
        </Panel>

        <Panel
          title="Invite a teammate"
          description="They will get access to inventory, leads and orders."
        >
          <form className="space-y-4">
            <Field label="Work email" htmlFor="tm-email">
              <input
                id="tm-email"
                type="email"
                placeholder="name@autohaven.ng"
                className={inputCls}
              />
            </Field>
            <Field
              label="Role"
              htmlFor="tm-role"
              hint="Managers can publish listings and issue refunds."
            >
              <select id="tm-role" className={selectCls} defaultValue="DEALER_STAFF">
                <option value="DEALER_MANAGER">Manager</option>
                <option value="DEALER_STAFF">Staff</option>
              </select>
            </Field>
            <div>
              <span className={labelCls}>Permissions</span>
              <ul className="space-y-2 text-[12px] text-ink/60">
                {[
                  "Respond to leads",
                  "Create and edit drafts",
                  "View orders and payouts",
                ].map((permission) => (
                  <li key={permission} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-jade" />
                    {permission}
                  </li>
                ))}
              </ul>
            </div>
            <SaveButton label="Send invite" className="w-full" />
            <p className="text-[11px] leading-relaxed text-ink/35">
              Seats are included in your Growth plan. Remove a member at any time.
            </p>
          </form>
        </Panel>
      </div>
    </div>
  );
}
