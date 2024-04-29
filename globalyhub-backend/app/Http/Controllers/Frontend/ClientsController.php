<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Clients;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use League\Csv\Reader;
use League\Csv\Writer;

class ClientsController extends Controller
{
    public function index()
    {
        $clients = Clients::all();
        return response()->json(['success'=>true,'message' => 'Client fetched successfully', 'data' => $clients]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateClient($request);

        $client = Clients::create($validated);

        $this->saveToCsv($client);

        return response()->json(['success'=>true,'message' => 'Client created successfully', 'data' => $client]);
    }

    public function show($id)
    {
        $client = Clients::find($id);
        if (!$client) {
            return response()->json(['success' => false, 'message' => 'Client not found'], 404);
        }
        return response()->json(['success'=>true,'message' => 'Client fetched successfully','data'=>$client]);
    }

    public function update(Request $request, $id)
    {
        $client = Clients::find($id);
        if (!$client) {
            return response()->json(['success' => false, 'message' => 'Client not found'], 404);
        }

        $validated = $this->validateClient($request, $client->id);

        $client->update($validated);

        $this->updateCsv($client);

        return response()->json(['success'=>true,'message' => 'Client updated successfully', 'data' => $client]);
    }

    public function destroy($id)
    {
        $client = Clients::find($id);
        if (!$client) {
            return response()->json(['success' => false, 'message' => 'Client not found'], 404);
        }
        $client->delete();

        $this->deleteFromCsv($id);

        return response()->json(['success'=>true,'message' => 'Client deleted successfully']);
    }

    private function validateClient(Request $request, $clientId = null)
    {
        return $request->validate([
            'name' => 'required|string|max:255',
            'gender' => 'required|string',
            'phone' => 'required|string|max:20',
            'email' => [
                'required',
                'email',
                Rule::unique('clients')->ignore($clientId),
            ],
            'address' => 'required|string|max:255',
            'nationality' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'education_background' => 'required|string',
            'preferred_contact' => 'required|in:email,phone,none',
        ]);
    }

    private function saveToCsv($client)
    {
        $csvFileName = storage_path('app/clients.csv');
        $csv = Writer::createFromPath($csvFileName, 'a+');
        $csv->insertOne([
            $client->id,
            $client->name,
            $client->gender,
            $client->phone,
            $client->email,
            $client->address,
            $client->nationality,
            $client->date_of_birth,
            $client->education_background,
            $client->preferred_contact
        ]);
    }

    private function updateCsv($client)
    {
        $csvFileName = storage_path('app/clients.csv');
        $csv = Reader::createFromPath($csvFileName, 'r+');
        $csv->setHeaderOffset(0);
        $records = $csv->getRecords();
        $updatedRecords = [];

        foreach ($records as $record) {
            if ($record['id'] == $client->id) {
                $record = [
                    'id' => $client->id,
                    'name' => $client->name,
                    'gender' => $client->gender,
                    'phone' => $client->phone,
                    'email' => $client->email,
                    'address' => $client->address,
                    'nationality' => $client->nationality,
                    'date_of_birth' => $client->date_of_birth,
                    'education_background' => $client->education_background,
                    'preferred_contact' => $client->preferred_contact
                ];
            }
            $updatedRecords[] = $record;
        }

        $csv = Writer::createFromPath($csvFileName, 'w+');
        $csv->insertOne([
            'id', 'name', 'gender', 'phone', 'email', 'address', 'nationality', 'date_of_birth', 'education_background', 'preferred_contact'
        ]);
        foreach ($updatedRecords as $record) {
            $csv->insertOne($record);
        }
    }

    private function deleteFromCsv($clientId)
    {
        $csvFileName = storage_path('app/clients.csv');
        $csv = Reader::createFromPath($csvFileName, 'r+');
        $csv->setHeaderOffset(0);
        $records = $csv->getRecords();
        $updatedRecords = [];

        foreach ($records as $record) {
            if ($record['id'] != $clientId) {
                $updatedRecords[] = $record;
            }
        }

        $csv = Writer::createFromPath($csvFileName, 'w+');
        $csv->insertOne([
            'id', 'name', 'gender', 'phone', 'email', 'address', 'nationality', 'date_of_birth', 'education_background', 'preferred_contact'
        ]);
        foreach ($updatedRecords as $record) {
            $csv->insertOne($record);
        }
    }
}
