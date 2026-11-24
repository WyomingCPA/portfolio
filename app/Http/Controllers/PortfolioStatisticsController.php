<?php

namespace App\Http\Controllers;

use App\Models\PortfolioSnapshot;

class PortfolioStatisticsController extends Controller
{
    public function index()
    {
        $snapshots = PortfolioSnapshot::orderBy('snapshot_date')
            ->get();

        $latest = $snapshots->last();
        $previous = $snapshots->count() > 1
            ? $snapshots[$snapshots->count() - 2]
            : null;

        $netWorthChange = $previous && $latest
            ? $latest->net_worth - $previous->net_worth
            : null;

        $assetsChange = $previous && $latest
            ? $latest->total_assets - $previous->total_assets
            : null;

        $liabilitiesChange = $previous && $latest
            ? $latest->total_liabilities - $previous->total_liabilities
            : null;

        return view('portfolio-statistics.index', compact(
            'snapshots',
            'latest',
            'netWorthChange',
            'assetsChange',
            'liabilitiesChange'
        ));
    }
}